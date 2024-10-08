import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import bcrypt from "bcryptjs";

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {

    const user = await User.findOne({ email });
    if(!user){
      return res.status(404).json({ message : 'User not found' });
    }

    const resetToken = jwt.sign({ id : user._id }, process.env.jwt_secret, { expiresIn : '1h'});
    const resetUrl = `http://localhost:5000/api/account/reset-password/${resetToken}`

    /* await WebTransportError.sendMail({
      from : process.env.email_user,
      to : user.email,
      subject : 'Password reset',
      html : `<p>Please click the url to reset password <a href="${resetUrl}">Reset password</a></p>`
    });  */
    res.status(200).json({ message : 'Password reset link sent to your email'})
  } catch (error) {

    console.error(error.message);
    return res.status(500).json({ message : 'Server error' })

  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.body;
  const { newPassword } = req.body;

  try {

    const decoded = jwt.verify(token, process.env.jwt_secret, { expiresIn : '1h' })
    const user = await User.findById(decoded.id);

    if(!user){
      return res.status(404).json({ message : 'User not found'})
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    await user.save();

    res.status(200).json({ message : 'Password updated successfully' })
    
  } catch (error) {
    console.error('Error resetting password : ', error.message);
    return res.status(500).json({ message : 'Server error' })
    
  }
}