if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin.js";

const app = express();

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
app.use("/student");

app.listen(3000, () => {
  console.log("listening on port 3000.");
});
