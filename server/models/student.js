import mongoose from "mongoose";
const { Schema } = mongoose;

const CounterSchema = new Schema({
  sequenceValue: {
    type: Number,
    default: 824562,
  },
});

const Counter = mongoose.model("Counter", CounterSchema);

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  dateOfCompletion: {
    type: Date,
    required: true,
  },
  paid: {
    type: String,
    enum: ["paid", "unpaid"],
  },
  domain: {
    type: String,
    required: true,
  },
  refNo: {
    type: String,
    unique: true,
  },
});

StudentSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const counter = await Counter.findOneAndUpdate(
        {},
        { $inc: { sequenceValue: 1 } },
        { new: true, upsert: true }
      );

      const currentYear = new Date().getFullYear();
      const domainInitials = this.domain
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
      const sequenceNumber = counter.sequenceValue.toString().padStart(6, "0");

      this.refNo = `SMM${currentYear}${domainInitials}${sequenceNumber}`;
    } catch (e) {
      return next(e);
    }
  }

  next();
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
