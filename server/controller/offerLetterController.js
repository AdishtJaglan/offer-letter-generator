import { fileURLToPath } from "url";
import path from "path";
import Student from "../models/student.js";
import { populatePDF } from "../scripts/populateLetter.js";
import { sendMail } from "../scripts/sendMail.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//@desc create offer letter PDF and email it to the student
//@auth required
//@route GET /offer-letter/send/:id
export const createPDFandSendMail = async (req, res) => {
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

  const outputPDFPath = path.join(__dirname, `../out/${student.name}.pdf`);

  await populatePDF(
    path.join(__dirname, "../template/updateOfferLetter.pdf"),
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
};
