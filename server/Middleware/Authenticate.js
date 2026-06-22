import jwt from 'jsonwebtoken'
import { user } from "../Model/UserModelSchema.js";
const authenticate = async (req, res, next) => {
  console.log("Cookies:", req.cookies);

  const token = req.cookies?.jwt;

  console.log("Token:", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      console.log("Decoded:", decoded);

      req.user = decoded;
      next();
    } catch (error) {
      console.log("JWT ERROR:", error.message);

      return res.status(401).json({
        message: "Token Failed",
      });
    }
  } else {
    console.log("NO TOKEN FOUND");

    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
};
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({ error: 'Not Authorized as Admin' });

    }
}
export { authenticate, authorizeAdmin };