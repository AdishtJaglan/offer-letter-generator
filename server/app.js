import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ExpressError from "./utility/ExpressHandler.js";

import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import offerLetterRoutes from "./routes/offerLetter.js";

const app = express();
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/offer-letter-generator")
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log("error connecting to database:", e);
  });

app.use(cors());
app.use(express.json());
app.use("/auth", adminRoutes);
app.use("/student", studentRoutes);
app.use("/offer-letter", offerLetterRoutes);

//handle invalid routes
app.all("*", (req, res, next) => {
  next(new ExpressError("Page not found.", 404));
});

//generic error handler
app.use((err, req, res, next) => {
  const {
    statusCode = 500,
    message = "Something went wrong with the server.",
  } = err;

  res.statusCode(statusCode).json({ error: message });
});

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
