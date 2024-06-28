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

async function generateRefNo(doc) {
  try {
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );

    const currentYear = new Date().getFullYear();
    const domainInitials = doc.domain
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
    const sequenceNumber = counter.sequenceValue.toString().padStart(6, "0");

    doc.refNo = `SMM${currentYear}${domainInitials}${sequenceNumber}`;
  } catch (e) {
    throw new Error(e);
  }
}

StudentSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("domain")) {
    await generateRefNo(this);
  }
  next();
});

StudentSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.domain) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    await generateRefNo(docToUpdate);
    this.setUpdate(docToUpdate);
  }
  next();
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
