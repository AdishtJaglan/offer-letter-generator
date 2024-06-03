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

export const sendMail = async function (mailOptions) {
  try {
    await transporter.sendMail(mailOptions);
    console.log("email has been sent.");
  } catch (err) {
    console.log("some error occurred: ", err);
  }
};
