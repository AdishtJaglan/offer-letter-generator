import express from "express";
import {
  createStudent,
  deleteStudent,
  getLatestStudents,
  getOneStudent,
  getStudents,
  searchStudentByName,
  updateStudent,
} from "../controller/studentController.js";
import { verifyToken } from "../middlewares/middleware.js";
import validateStudent from "../middlewares/studentValidate.js";
const router = express.Router();

//@desc enter data for a student
//@auth required
//@route POST /student/create
router.post("/create", verifyToken, validateStudent, createStudent);

//@desc get all student info, can add query strings ?limit=N and ?skip=M to get N entries starting from M
//@auth required
//@route GET /student/info?limit=N&skip=M
router.get("/info", verifyToken, getStudents);

//@desc get information regarding one student by searching name like ?name=X where X is name
//@auth required
//@route GET /student/name?limit=N&skip=M
router.get("/name", verifyToken, searchStudentByName);

//@desc get last 10 entries from the database
//@auth required
//@route GET /student/latest
router.get("/latest", verifyToken, getLatestStudents);

//@desc get a single student info
//@auth required
//@route GET /student/:id
router.get("/:id", verifyToken, getOneStudent);

//@desc update student info
//@auth required
//@route PUT /student/:id
router.put("/:id", verifyToken, updateStudent);

//@desc delete a student
//@auth required
//@route DELETE /student/:id
router.delete("/:id", verifyToken, deleteStudent);

export default router;
