import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";

import { sendMail } from "./scripts/sendMail.js";
import { populatePDF } from "./scripts/populateLetter.js";
import path from "path";
import { fileURLToPath } from "url";
import Student from "./models/student.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/offer-letter-generator")
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log("error connecting to database:", e);
  });

app.use(express.json());
app.use("/auth", adminRoutes);
app.use("/student", studentRoutes);

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
};

app.get("/offer-letter/send/:id", async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);

  if (!student) {
    return res.status(400).json({ message: "Student not found." });
  }

  const data = {
    internName: student.name,
    domainName: student.domain,
    dateOfJoining: student.dateOfJoining.toISOString(),
    dateOfCompletion: student.dateOfCompletion.toISOString(),
    currentDate: new Date().toISOString(),
    refNo: student.refNo,
  };

  const outputPDFPath = path.join(__dirname, `./out/${student.name}.pdf`);

  await populatePDF(
    path.join(__dirname, "./template/updateOfferLetter.pdf"),
    outputPDFPath,
    data
  );

  const mailOptions = {
    from: {
      name: "Suvidha Foundation",
      address: process.env.USER_EMAIL,
    },
    to: student.email,
    subject: "Suvidha Offer Letter",
    attachments: [
      {
        filename: `${student.name}.pdf`,
        path: outputPDFPath,
        contentType: "application/pdf",
      },
    ],
  };

  await sendMail(mailOptions);

  res.status(200).json({ message: "Email sent successfully." });
});

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
