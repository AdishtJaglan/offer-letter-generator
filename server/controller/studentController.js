import Student from "../models/student.js";
import ExpressError from "../utility/ExpressHandler.js";
import AsyncHandler from "../utility/asyncHandler.js";

//@desc enter data for a student
//@auth required
//@route POST /student/create
export const createStudent = AsyncHandler(async (req, res) => {
  try {
    const { name, email, dateOfJoining, dateOfCompletion, domain } = req.body;

    if (!name || !email || !dateOfJoining || !dateOfCompletion || !domain) {
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
      domain,
    });

    await student.save();

    if (student) {
      res
        .status(200)
        .json({ message: "Student created successfully.", student });
    } else {
      res.status(400).json({ message: "Student not created." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating student: " + error.message });
  }
});

//@desc get last 10 entries from the database
//@auth required
//@route GET /student/latest
export const getLatestStudents = AsyncHandler(async (req, res) => {
  try {
    const limit = 10;
    const students = await Student.find().sort({ _id: -1 }).limit(limit);

    res.status(200).json(students.reverse());
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching latest entries: " + error.message });
  }
});

//@desc get all student info, can add query strings ?limit=N and ?skip=M to get N entries starting from M
//@auth required
//@route GET /student/info?limit=N&skip=M
export const getStudents = AsyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0;
    const skip = parseInt(req.query.skip) || 0;
    const students = await Student.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students: " + err.message });
  }
});

//@desc get a single student info
//@auth required
//@route GET /student/:id
export const getOneStudent = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      throw new ExpressError("Student not found.", 403);
    }

    res.status(200).json({ message: "Student found.", student_info: student });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching student information: " + error.message,
    });
  }
});

//@desc update student info
//@auth required
//@route PUT /student/:id
export const updateStudent = AsyncHandler(async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      message: "Error updating student information: " + error.message,
    });
  }
});

//@desc delete a student
//@auth required
//@route DELETE /student/:id
export const deleteStudent = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const checkStudent = await Student.findById(id);

    if (!checkStudent) {
      throw new ExpressError("Student not found.", 403);
    }

    await Student.findByIdAndDelete(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting student: " + error.message });
  }
});

//@desc get information regarding one student by searching name like ?name=X where X is name
//@auth required
//@route GET /student/name?name=X
export const searchStudentByName = AsyncHandler(async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      throw new ExpressError("Name query parameter is required.", 400);
    }

    const nameParts = name.trim().split(/\s+/);
    let regex;

    if (nameParts.length > 1) {
      regex = new RegExp(`^${name.trim()}$`, "i");
    } else {
      regex = new RegExp(name.trim(), "i");
    }

    const students = await Student.find({
      name: { $regex: regex },
    });

    if (students.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }

    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching student: " + error.message });
  }
});
