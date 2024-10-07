import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import User from "../models/SignupModel.js";
import dotenv from 'dotenv';

dotenv.config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign( { id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token and success message
    res.status(200).json({ message: "Logged in successfully", token });

  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

export default login;
