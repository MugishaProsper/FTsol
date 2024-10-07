import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/SignupModel.js';
import dotenv from "dotenv";

dotenv.config();

const signup = async (req, res) => {
  const { firstName, lastName,username, id_card, passport, email, password } = req.body;

  try {

    const signing_user = await User.findOne({
      $or: [{ email }, { id_card }, { passport }]
    });

    if (signing_user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      username,
      id_card,
      passport,
      email,
      password: hashedPassword
    });
    await user.save();
    const token = jwt.sign( { id: user._id }, process.env.jwt_secret, { expiresIn: '1h' } );

    res.status(201).json({ message: "Account created successfully", token: token });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default signup;
