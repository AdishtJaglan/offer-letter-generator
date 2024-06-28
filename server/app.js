if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ExpressError from "./utility/ExpressHandler.js";

import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import offerLetterRoutes from "./routes/offerLetter.js";

const app = express();

mongoose
  .connect(
    process.env.MONGO_CONNECTION_STRING ||
      "mongodb://127.0.0.1:27017/offer-letter-generator"
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log("error connecting to database:", e);
  });

app.use(
  cors({
    origin: [
      "https://offer-letter-generator-mvm98n54z-adishtjaglans-projects.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", adminRoutes);
app.use("/student", studentRoutes);
app.use("/offer-letter", offerLetterRoutes);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

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

  res.status(statusCode).json({ error: message });
});

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
