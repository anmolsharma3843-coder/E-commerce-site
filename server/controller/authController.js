import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { user } from "../Model/UserModelSchema.js";

// REGISTER
export const Createuser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Fill all fields",
    });
  }

  const exists = await user.findOne({ email });

  if (exists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await user.create({
    username,
    email,
    password: hashed,
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );

  res.status(201).json({
    token,
    _id: newUser._id,
    username: newUser.username,
    email: newUser.email,
    profileImage: newUser.profileImage,
    isAdmin: newUser.isAdmin,
  });
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existing = await user.findOne({ email });

  if (!existing || !(await bcrypt.compare(password, existing.password))) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: existing._id,
      email: existing.email,
      isAdmin: existing.isAdmin,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "5d",
    }
  );

  res.json({
    token,
    _id: existing._id,
    username: existing.username,
    email: existing.email,
    profileImage: existing.profileImage,
    isAdmin: existing.isAdmin,
  });
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.json({
    message: "Logged out Successfully",
  });
};