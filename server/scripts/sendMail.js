import { createTransport } from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../.env") });

const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.USER_EMAIL, // sender gmail address
    pass: process.env.APP_PASSWORD, // app password from gmail account
  },
});

const mailOptions = {
  from: {
    name: "adishtlol",
    address: process.env.USER_EMAIL,
  },
  to: ["adisht1521@gmail.com"],
  subject: "Suvidha Offer Letter",
  attachments: [
    {
      filename: "updateOfferLetter.pdf",
      path: join(__dirname, "../template/updateOfferLetter.pdf"),
      contentType: "application/pdf",
    },
  ],
};

const sendMail = async function (transporter, mailOptions) {
  try {
    await transporter.sendMail(mailOptions);
    console.log("email has been sent.");
  } catch (err) {
    console.log("some error occurred: ", err);
  }
};

sendMail(transporter, mailOptions);
