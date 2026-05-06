import jwt from 'jsonwebtoken'
import { user } from "../Model/UserModelSchema.js";
const authenicate=async(req,res,next)=>{
    let token;
    token=req.cookies?.jwt;
    if(token){
        try {
            const decoded=jwt.verify(token,process.env.SECRET_KEY)
            req.user= decoded;
            next();
        } catch (error) {
            res.status(400);
            throw new Error("User Not Authorized, Token Faild")
        }
    }else{
            res.status(400).json({ message: "Invalid credentials" });
        }
}
const authorizeAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).json({ error: 'Not Authorized as Admin' });

    }
}
export {authenicate,authorizeAdmin};