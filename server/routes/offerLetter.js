import express from "express";
import { verifyToken } from "../middlewares/middleware.js";
import {
  createPDFandDownload,
  createPDFandSendMail,
} from "../controller/offerLetterController.js";

const router = express.Router();

//@desc create offer letter PDF and email it to the student
//@auth required
//@route GET /offer-letter/send/:id
router.get("/send/:id", verifyToken, createPDFandSendMail);

//@desc create offer letter PDF and download it in users local device
//@auth required
//@route GET /offer-letter/download/:id
router.get("/download/:id", verifyToken, createPDFandDownload);

export default router;
