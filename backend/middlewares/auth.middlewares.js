import { User } from "../models/user.models.js";
import { configDotenv } from "dotenv";
import jwt from 'jsonwebtoken';
configDotenv();

export const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
      return res.status(404).json({ message : "No token provided" })
    }
    const decoded = jwt.verify(token, process.env.jwt_secret);
    if(!decoded){
      return res.status(403).json({ message : "Invalid token" })
    };
    const user = await User.findById(decoded.id).select("-password");
    if(!user){
      return res.status(403).json({ message : "User not found" })
    };
    req.user = user;
    next()
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message : "Error in auth middlware"})
  }
}