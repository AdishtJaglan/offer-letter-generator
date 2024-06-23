import express from "express";
import {
  deleteAdmin,
  getAdminInfo,
  getAdmins,
  loginAdmin,
  registerAdmin,
  updateAdmin,
} from "../controller/adminController.js";
import { verifyToken } from "../middlewares/middleware.js";
import validateAdmin from "../middlewares/adminValidate.js";

const router = express.Router();

//@desc register a admin
//@auth required
//@route POST /auth/register
router.post("/register", verifyToken, validateAdmin, registerAdmin);

//@desc login a admin
//@auth not required
//@route POST /auth/login
router.post("/login", loginAdmin);

//@desc get all admin info
//@auth required
//@route GET /auth/info
router.get("/info", verifyToken, getAdmins);

//@desc get admin info
//@auth required
//@route GET /auth/info/:id
router.get("/info/:id", verifyToken, getAdminInfo);

//@desc update admin information
//@auth required
//@route PUT /auth/update/:id
router.put("/update/:id", verifyToken, updateAdmin);

//@desc delete an admin
//@auth required
//@route DELETE /auth/delete/:id
router.delete("/delete/:id", verifyToken, deleteAdmin);

export default router;
