import jwt from 'jsonwebtoken';
import authTokenBlacklist from '../models/authTokenBlacklistModel.js';
import dotenv from 'dotenv'

dotenv.config();

const authMiddleware = async (req, res, next) => {

  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ message : "No token provided"});
  }
  const token = authHeader.split(' ')[1];

  try {

    const authBlacklistedToken = await authTokenBlacklist.findOne({ token });
    if(authBlacklistedToken){
      return res.status(401).json({ message : "Token is blacklisted. Please try logging in again"})
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);

    req.user = decoded;

    /* if(!req.user.isVerified){
      return res.status(400).json({ message : 'Please verify your account to access this resource'});
    } */
    next();
    
  } catch (error) {
    console.error("Token verification failed : ", error.message)
    res.status(401).json({ message : "Invalid token" });
  }

}

export default authMiddleware;