import { Users } from "../models/user.models";

export const updateProfile = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.user._id;
  try {
    const user = await Users.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await user.update({ email : email, password : hashedPassword });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" })
  }
};

export const resetPassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await Users.findById(userId);
    if(!user){
      return res.status(404).json({ message : "User ot found" })
    };
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if(!isPasswordValid){
      return res.status(403).json({ message : "Password incorrect" })
    };
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message : "Password reset successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}


export const deleteAccount = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;  
  try {
    const user = await Users.findById(userId);
    if(!user){
      return res.status(404).json({ message : "Account not found" })
    };
    const isPasswordValid = await bcrypt.compare(user.password, password);
    if(!isPasswordValid){
      return res.status(403).json({ message : "Password invalid" })
    };
    await user.deleteOne();
    return res.status(200).json({ message : "Account deleted successfully" })
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}