import jwt from 'jsonwebtoken';
import authTokenBlacklist from '../models/authTokenBlacklistModel.js';
import dotenv from 'dotenv'

dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(' ')[1];
  try {
    // Check if the token is blacklisted
    const authBlacklistedToken = await authTokenBlacklist.findOne({ token });
    if (authBlacklistedToken) {
      return res.status(401).json({ message: "Token is blacklisted. Please try logging in again" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.jwt_secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed: ", error);
    res.status(401).json({ message: "Invalid token" });
  }
}

export default authMiddleware;
