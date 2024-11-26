import { sendVerificationCode } from '../config/email.config.js';
import { User, Codebase } from '../models/user.models.js';
import { generateTokenAndSetCookie } from '../plugins/generate.auth.token.js';
import { generateVerificationCode } from '../plugins/generate.verification.code.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email : email });
    if(existingUser){
      return res.status(401).json({ message : "User already exists" });
    }
    const verificationCode = generateVerificationCode();
    await sendVerificationCode(email, verificationCode);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ firstName, lastName, email, email, password : hashedPassword });
    await newUser.save();
    const newCodesRepo = new Codebase({ account : newUser._id, verificationCode });
    await newCodesRepo.save();
    res.status(200).json({ message : "successfully created user", newUser })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message : "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({ message : "User already exists" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(403).json({ message : "Incorrect password" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json(user)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge : 0 });
    res.status(200).json({ message : "Logout successful" })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const verifyCode = async (req, res) => {
  const { verificationCode } = req.body;
  const userId = req.user._id;
  try {
    const user = await Codebase.findById({ account : userId });
    if(!user){
      return res.status(403).json({ message : "User not found" });
    };
    if(user.verificationCode != verificationCode){
      return res.status(403).json({ message : "Incorrect verification code" });
    }
    user.isVerified = true;
    await user.save();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}