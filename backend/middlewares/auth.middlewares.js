import { User } from "../models/user.models.js";
import jwt from 'jsonwebtoken';
import { configDotenv } from "dotenv";

configDotenv();

export const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token with the correct secret
    const decoded = jwt.verify(token, process.env.jwt_secret);
    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error in auth middleware" });
  }
};
