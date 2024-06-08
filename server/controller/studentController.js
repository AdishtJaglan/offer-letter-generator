import Student from "../models/student.js";
import ExpressError from "../utility/ExpressHandler.js";
import AsyncHandler from "../utility/asyncHandler.js";

//@desc enter data for a student
//@auth required
//@route POST /student/create
export const createStudent = AsyncHandler(async (req, res) => {
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
    throw new ExpressError("All fields are mandatory.", 400);
  }

  const checkStudent = await Student.findOne({ email });

  if (checkStudent) {
    throw new ExpressError("Student already exists.", 400);
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
export const getStudents = AsyncHandler(async (req, res) => {
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
export const getOneStudent = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);

  if (!student) {
    throw new ExpressError("Student not found.", 403);
  }

  res.json({ message: "Student found.", student_info: student });
});

//@desc update student info
//@auth required
//@route PUT /student/:id
export const updateStudent = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateBody = req.body;
  const checkStudent = await Student.findById(id);

  if (!checkStudent) {
    throw new ExpressError("Student not found.", 403);
  }

  await Student.findByIdAndUpdate(id, updateBody, { new: true });
  res
    .status(200)
    .json({ message: "Student information updated successfully." });
});

//@desc delete a student
//@auth required
//@route DELETE /student/:id
export const deleteStudent = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const checkStudent = await Student.findById(id);

  if (!checkStudent) {
    throw new ExpressError("Student not found.", 403);
  }

  await Student.findByIdAndDelete(id);
  res.status(200).json({ message: "Student deleted successfully" });
});
