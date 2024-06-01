import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc register a admin
//@auth not required
//@route POST /auth/register
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All field mandatory.");
  }

  const checkAdmin = await Admin.findOne({ email });

  if (checkAdmin) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const admin = new Admin({
    name,
    email,
    password: hashedPassword,
  });

  await admin.save();

  console.log("Created user: ", admin);

  if (admin) {
    res.status(200).json({ message: "Admin created successfully.", admin });
  } else {
    res.status(400).json({ message: "Admin not created." });
  }
};

//@desc login a admin
//@auth not required
//@route POST /auth/login
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.status(403).json({ message: "User not found." });
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
    refresh_token: refreshToken,
    access_token: accessToken,
  });
};
