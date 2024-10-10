import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
import Notification from '../models/notificationModel.js'

// Login functionality
export const login = async (req, res) => {
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
    const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });

    // Send the token and success message
    res.status(200).json({ message: "Logged in successfully", token });

  } catch (error) {
    console.error("Error logging in:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

// Signup functionality
export const signup = async (req, res) => {
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

// Logout functionality
export const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({ message : "No token provided" })
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000)

    await authTokenBlacklist.create({ token, expiresAt })
    return res.status(200).json({ message : "Logged out successfully" })
    
  } catch (error) {

    console.error("Error logging out : ", error.message)
    return res.status(500).json({ message : "Server error" });
  }
}

// Account verification functionality
export const verifyAccount = async (req, res) => {  
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

// Email verification functionality
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  try {
    
    const decoded = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decoded);
    if(!user){
      return res.status(404).json({ message : 'User not found' })
    }
    user.isEmailVerified = true;
    await user.save();
    
    res.status(200).json({ message : 'Your email has been verified', user })

  } catch (error) {

    console.error(error.message)
    res.status(500).json({ message : 'Server error' })
    
  }
}

// Request password reset functionality
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

    // Send notification of email update
    const notification = new Notification({ user : user._id, message : `Reset link has been sent to ${email}`, type : 'info' });
    io.to(user._id).emit('newNotification', notification);
    return res.status(200).json({ message : 'Password reset link sent to your email'})
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : 'Server error' });
  }
}

// Password reset functionality
export const resetPassword = async (req, res) => {
  const { token } = req.body;
  const { newPassword } = req.body;

  try {
    // Check the sent token
    const decoded = jwt.verify(token, process.env.jwt_secret, { expiresIn : '1h' })
    // Get the user being sent the token
    const user = await User.findById(decoded.id);
    if(!user){
      return res.status(404).json({ message : 'User not found'})
    }
    // Manual hashing of the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    await user.save();
    // Initialize realtime socket.io notification
    const notification = new Notification({ user : user._id, message : 'Your password is updated successfully', type : 'info' })
    io.to(user._id).emit('newNotification', notification)
    // Send response to the server
    res.status(200).json({ message : 'Password updated successfully' })
    
  } catch (error) {
    console.error('Error resetting password : ', error.message);
    return res.status(500).json({ message : 'Server error' });    
  }
}

export const deactivateUserAccount = async (req, res) => {
  const userId = req.user.id;
  try{
    await User.findOneAndUpdate(userId, { isDeactivated : true });
    const notification = new Notification({ user : userId, message : 'Your account has been deactivated', type : 'alert' })
    io.to(userId).emit('newNotification', notification);
    return res.status(200).json({ message : 'Account deactivated' });
  }catch(error){
    console.error(error.message)
    res.status(500).json({ message : 'Server error' , error : error.message })
  }
}