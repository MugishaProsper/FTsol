import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decoded);

    if(!user){
      return res.status(404).json({ message : 'User not found' })
    }
    user.isEmailVerified = true;
    await user.save();

  } catch (error) {

    console.error(error.message)
    res.status(500).json({ message : 'Server error' })
    
  }
}

export default verifyEmail