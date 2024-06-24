import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { hashPasswordMiddleware } from "../middlewares/hashPasswordMiddleware.js";
const { Schema } = mongoose;
const MAX_ADMINS = 5;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

AdminSchema.pre("save", hashPasswordMiddleware);

AdminSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

AdminSchema.pre("save", async function (next) {
  const adminCount = await Admin.countDocuments();
  if (adminCount >= MAX_ADMINS) {
    const error = new Error(`Admin limit of ${MAX_ADMINS} reached.`);
    error.status = 403;
    return next(error);
  }
  next();
});

const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
