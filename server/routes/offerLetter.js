import express from "express";
import { verifyToken } from "../middleware.js";
import { createPDFandSendMail } from "../controller/offerLetterController.js";

const router = express.Router();

//@desc create offer letter PDF and email it to the student
//@auth required
//@route GET /offer-letter/send/:id
router.get("/send/:id", verifyToken, createPDFandSendMail);

export default router;
