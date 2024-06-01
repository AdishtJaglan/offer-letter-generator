import express from "express";
import { loginAdmin, registerAdmin } from "../controller/adminController.js";
import { verifyToken } from "../middleware.js";

const router = express.Router();

//@desc register a admin
//@auth required
//@route POST /auth/register
router.post("/register", verifyToken, registerAdmin);

//@desc login a admin
//@auth not required
//@route POST /auth/login
router.post("/login", loginAdmin);

export default router;
