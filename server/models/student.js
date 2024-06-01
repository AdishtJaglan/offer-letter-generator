import mongoose from "mongoose";
const Schema = { mongoose };

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
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  refNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
