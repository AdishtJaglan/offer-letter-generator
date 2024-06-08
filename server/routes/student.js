import express from "express";
import {
  createStudent,
  deleteStudent,
  getOneStudent,
  getStudents,
  updateStudent,
} from "../controller/studentController.js";
import { verifyToken } from "../middlewares/middleware.js";
import validateStudent from "../middlewares/studentValidate.js";
const router = express.Router();

//@desc enter data for a student
//@auth required
//@route POST /student/create
router.post("/create", verifyToken, validateStudent, createStudent);

//@desc get all student info, can add a query string ?limit=N to get last N entries into the db
//@auth required
//@route GET /student/info
router.get("/info", verifyToken, getStudents);

//@desc get a single student info
//@auth required
//@route GET /student/:id
router.get("/:id", verifyToken, getOneStudent);

//@desc update student info
//@auth required
//@route PUT /student/:id
router.put("/:id", verifyToken, validateStudent, updateStudent);

//@desc delete a student
//@auth required
//@route DELETE /student/:id
router.delete("/:id", verifyToken, deleteStudent);

export default router;
