import express from "express";
import {
  createStudent,
  deleteStudent,
  getOneStudent,
  getStudents,
  updateStudent,
} from "../controller/studentController.js";
const router = express.Router();

//@desc enter data for a student
//@auth required
//@route POST /student/create
router.post("/create", createStudent);

//@desc get all student info, can add a query string ?limit=N to get last N entries into the db
//@auth required
//@route GET /student/info
router.get("/info", getStudents);

//@desc get a single student info
//@auth required
//@route GET /student/:id
router.get("/:id", getOneStudent);

//@desc update student info
//@auth required
//@route PUT /student/:id
router.put("/:id", updateStudent);

//@desc delete a student
//@auth required
//@route DELETE /student/:id
router.delete("/:id", deleteStudent);

export default router;
