import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AsyncHandler from "../utility/asyncHandler.js";
import ExpressError from "../utility/ExpressHandler.js";

//@desc register a admin
//@auth required
//@route POST /auth/register
export const registerAdmin = AsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new ExpressError("All field mandatory.", 400);
    }

    const checkAdmin = await Admin.findOne({ email });

    if (checkAdmin) {
      res.status(400);
      throw new Error("User already exists");
    }

    const admin = new Admin({
      name,
      email,
      password,
    });

    await admin.save();

    console.log("Created admin: ", admin);

    if (admin) {
      res.status(200).json({ message: "Admin created successfully.", admin });
    } else {
      res.status(400).json({ message: "Admin not created." });
    }
  } catch (e) {
    res.status(500).json({ error: "Error creating admin: " + e.message });
  }
});

//@desc login a admin
//@auth not required
//@route POST /auth/login
export const loginAdmin = AsyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      throw new ExpressError("User not found.", 403);
    }

    const comparePassword = await bcrypt.compare(password, admin.password);

    if (!comparePassword) {
      res.status(403).json({ message: "Invalid credentials." });
    }

    const accessToken = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
        id: admin.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      {
        name: admin.name,
        email: admin.email,
        id: admin.id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      name: admin.name,
      refresh_token: refreshToken,
      access_token: accessToken,
    });
  } catch (e) {
    res.status(500).json({ error: "Error while logging in: " + e.message });
  }
});

//@desc update admin information
//@auth required
//@route PUT /auth/update/:id
export const updateAdmin = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateBody = req.body;
    const findAdmin = await Admin.findById(id);

    if (!findAdmin) {
      throw new ExpressError("Admin not found.", 403);
    }

    await Admin.findByIdAndUpdate(id, updateBody, { new: true });
    res
      .status(200)
      .json({ message: "Admin information updated successfully." });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Error updating admin information: " + e.message });
  }
});

//@desc delete an admin
//@auth required
//@route POST /auth/delete/:id
export const deleteAdmin = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findAdmin = await Admin.findById(id);

    if (!findAdmin) {
      throw new ExpressError("Admin not found.", 403);
    }

    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin successfully deleted." });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Error deleting admin information: " + e.message });
  }
});

//@desc get all admin info
//@auth required
//@route GET /auth/info
export const getAdmins = AsyncHandler(async (req, res) => {
  try {
    const admins = await Admin.find();

    if (!admins) {
      throw new ExpressError("Admin information not found.", 403);
    }

    res.status(200).json({ message: "Admins found successfully", admins });
  } catch (e) {
    res.status(500).json({ error: "Error fetching admin data: " + e.message });
  }
});

//@desc get admin info
//@auth required
//@route GET /auth/info/:id
export const getAdminInfo = AsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findAdmin = await Admin.findById(id);

    if (!findAdmin) {
      throw new ExpressError("Admin not found", 403);
    }

    res.status(200).json({ message: "Admin information found.", findAdmin });
  } catch (e) {
    res
      .status(500)
      .json({ error: "Error fetching admin information: " + e.message });
  }
});
