import bcrypt from "bcryptjs";
import { user } from "../Model/UserModelSchema.js";
import { generateToken } from "../utilies/generatetoken.js";

// REGISTER
export const Createuser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Fill all fields" });

  const exists = await user.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await user.create({
    username,
    email,
    password: hashed,
  });

  generateToken(res, newUser);

  res.status(201).json(newUser);
};

// LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const existing = await user.findOne({ email });

  if (!existing || !(await bcrypt.compare(password, existing.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(res, existing);

  res.json({
    _id: existing._id,
    username: existing.username,
    email: existing.email,
  profileImage:existing.profileImage
    
  });
};

// LOGOUT
export const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logged out Successfully" });
};