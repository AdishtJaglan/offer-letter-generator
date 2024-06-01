if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
import Student from "./models/student.js";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/offer-letter-generator")
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log("error connecting to database:", e);
  });

app.use(express.json());
app.use("/auth", adminRoutes);
// app.use("/student");

//@desc enter data for a student
//@auth required
//@route POST /student/create
app.post("/student/create", async (req, res) => {
  const { name, email, dateOfJoining, dateOfCompletion, paid, domain, refNo } =
    req.body;

  if (
    !name ||
    !email ||
    !dateOfJoining ||
    !dateOfCompletion ||
    !paid ||
    !domain ||
    !refNo
  ) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }

  const checkStudent = await Student.findOne({ email });

  if (checkStudent) {
    res.status(400);
    throw new Error("Student already exists.");
  }

  const student = new Student({
    name,
    email,
    dateOfJoining,
    dateOfCompletion,
    paid,
    domain,
    refNo,
  });

  await student.save();

  if (student) {
    res.status(200).json({ message: "Student created successfully.", student });
  } else {
    res.status(400).json({ message: "Student not created." });
  }
});

//@desc get all student info, can add a query string ?limit=N to get last N entries into the db
//@auth required
//@route GET /student/info
app.get("/student/info", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const students = await Student.find().sort({ createdAt: -1 }).limit(limit);

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students: " + err.message });
  }
});

//@desc get a single student info
//@auth required
//@route GET /student/:id
app.get("/student/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);

  if (!student) {
    res.status(403).json({ message: "Student not found." });
  }

  res.json({ message: "Student found.", student_info: student });
});

//@desc delete a student
//@auth required
//@route DELETE /student/:id
app.delete("/student/:id", async (req, res) => {
  const { id } = req.params;
  const checkStudent = await Student.findById(id);

  if (!checkStudent) {
    res.status(403).json({ message: "Student not found." });
  }

  await Student.findByIdAndDelete(id);
  res.status(200).json({ message: "Student deleted successfully" });
});

//@desc update student info
//@auth required
//@route PUT /student/:id
app.put("/student/:id", async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const checkStudent = await Student.findById(id);

  if (!checkStudent) {
    res.status(403).json({ message: "Student not found." });
  }

  await Student.findByIdAndUpdate(id, updateBody, { new: true });
  res
    .status(200)
    .json({ message: "Student information updated successfully." });
});

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
