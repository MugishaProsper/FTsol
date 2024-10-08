import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from "dotenv";
import nodemailer from 'nodemailer'

dotenv.config();

const testAccount = nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  service : 'smtp.ethereal.email',
  port : 587,
  auth : {
    user : testAccount.user,
    pass : testAccount.pass
  }
})

const signup = async (req, res) => {
  const { firstName, lastName, username, id_card, email, password,passport, phone_number } = req.body;

  try {
    const signing_user = await User.findOne({ $or: [{ email }, { id_card }] });

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
      email,
      passport,
      password: hashedPassword,
      phone_number
    });

    const verificationToken = jwt.sign({id : user._id.toString()}, process.env.jwt_secret, { expiresIn : '1h'})

    const verificationUrl = `http://localhost:5000/api/verify/${verificationToken}`;

    // Sending emails will be activated once I verify my google account

    /* await transporter.sendMail({
      from : process.env.email_user,
      to : user.email,
      subject : 'Account Verification',
      html : `<p>Please click on the link below to verify your account <a href="${verificationUrl}">Verify</a></p>`
    }); */

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });

    res.status(201).json({ message: "Account created successfully. Please check your email address" });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

export default signup;
