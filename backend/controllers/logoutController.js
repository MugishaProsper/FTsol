import jwt from "jsonwebtoken";
import authTokenBlacklist from "../models/authTokenBlacklistModel.js";
import dotenv from 'dotenv';

dotenv.config();

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ message : "No token provided" })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000)

    await authTokenBlacklist.create({ token, expiresAt })
    return res.status(200).json({ message : "Logged out successfully" })
    
  } catch (error) {

    console.error("Error logging out : ", error.message)
    return res.status(500).json({ message : "Server error" });
  }
}

export default logout