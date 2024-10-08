import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const verifyAccount = async (req, res) => {  
  const token = req.params.token;

  try {

    const decoded = jwt.verify(token, process.env.jwt_secret)
    const user = await User.findById(decoded.id);

    if(!user){
      return res.status(404).json({ message : "Invalid token or has expired" })
    }
    if(user.isVerified){
      return res.status(404).json({ message : "You have been already verified" })
    }
    user.isVerified = true;
    await user.save()
    return res.status(200).json({ message : "Account verified successfully"})
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" })
  }
}
export default verifyAccount;