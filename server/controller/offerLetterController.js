import { fileURLToPath } from "url";
import path from "path";
import Student from "../models/student.js";
import { populatePDF } from "../scripts/populateLetter.js";
import { sendMail } from "../scripts/sendMail.js";
import { deleteLetter } from "../scripts/deleteLetter.js";
import AsyncHandler from "../utility/asyncHandler.js";
import ExpressError from "../utility/ExpressHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//@desc create offer letter PDF and email it to the student
//@auth required
//@route GET /offer-letter/send/:id
export const createPDFandSendMail = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      throw new ExpressError("Student not found.", 400);
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

    await Promise.all([
      populatePDF(
        path.join(__dirname, "../template/updateOfferLetter.pdf"),
        outputPDFPath,
        data
      ),
      sendMail({
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
      }),
    ]);
    await deleteLetter(outputPDFPath);

    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error in creating PDF or sending email: " + error.message,
      });
  }
});

//@desc create offer letter PDF and download it in users local device
//@auth required
//@route GET /offer-letter/download/:id
export const createPDFandDownload = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      throw new ExpressError("Student not found.", 400);
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

    res.download(outputPDFPath, `${student.name}.pdf`, async (err) => {
      if (err) {
        console.log("Error downloading the pdf: ", err);
        throw new ExpressError("PDF not downloaded.", 500);
      } else {
        try {
          await deleteLetter(outputPDFPath);
          console.log(`Deleted PDF: ${outputPDFPath}`);
        } catch (e) {
          console.log("Error deleting PDF: ", e);
        }
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating or downloading PDF: " + error.message });
  }
};
