import express from "express";
import { loginAdmin, registerAdmin } from "../controller/adminController.js";
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
router.post("/login", validateAdmin, loginAdmin);

export default router;
