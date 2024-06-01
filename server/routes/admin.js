import express from "express";
import { loginAdmin, registerAdmin } from "../controller/adminController.js";

const router = express.Router();

//@desc register a admin
//@auth not required
//@route POST /auth/register
router.post("/register", registerAdmin);

//@desc login a admin
//@auth not required
//@route POST /auth/login
router.post("/login", loginAdmin);

export default router;
