import jwt from 'jsonwebtoken'
import { user } from "../Model/UserModelSchema.js";
const authenticate = async (req, res, next) => {
    const token = req.cookies?.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400);
            throw new Error("User Not Authorized, Token Failed")
        }
    } else {
        res.status(400).json({ message: "Invalid credentials" });
    }
}
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).json({ error: 'Not Authorized as Admin' });

    }
}
export { authenticate, authorizeAdmin };