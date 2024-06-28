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
        path.join(__dirname, "../template/offer-letter-template.pdf"),
        outputPDFPath,
        data
      ),
      sendMail({
        from: {
          name: "Suvidha Foundation",
          address: process.env.USER_EMAIL,
        },
        to: student.email,
        subject: "Re: Suvidha Offer Letter",
        text: `
    Dear intern,

    Greetings of the day.

    Congratulations on your offer from Suvidha Foundation!
    Please find the attached - detailed offer letter.

    For the process of acceptance, Please revert back the physically signed copy of the Offer Letter within 48 hours.
    Email us here back:-
    hr@suvidhafoundationedutech.org

    After Successful Completion of your internship, You will be Awarded with "Certificate of Completion" And on the basis of your Performance "Letter of Recommendation".

    We are looking forward to hearing from you and hope you'll join our team!

    Best regards,

    Human Resource Team
    Mail: suvidhafoundation00@gmail.com
    hr@suvidhafoundationedutech.org
    Suvidha Foundation
    R. No: MH/568/95/Nagpur
    H.No. 1951, W.N.4, Khaperkheda, Saoner, Nagpur
    Email:
    info@suvidhafoundationedutech.org
  `,
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
      path.join(__dirname, "../template/offer-letter-template.pdf"),
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
