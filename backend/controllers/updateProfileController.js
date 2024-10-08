import User from "../models/userModel.js";

const updateUserProfile = async (req, res) => {
  const { firstName, lastName, username, id_card, passport, email, phone_number } = req.body;
  const userId = req.user.id;

  try {
    const updatedUser = User.findByIdAndUpdate(userId, {firstName, lastName, username, id_card, passport, email, phone_number }, { new : true}, { runValidators : true }).lean();

    if(!updatedUser){
      return res.status(404).json({ message : 'User not found' })
    }
    const responseUser = { firstName : updatedUser.firstName, lastName : updatedUser.lastName, username : updatedUser, id_card : updatedUser.id, passport : updatedUser.passport, email : updatedUser.email, phone_number : updateUser.phone_number }

    res.status(200).json({ message : 'Profile updated successfully', responseUser })

  } catch (error) {

    console.error("Error updating profile : ", error.message);
    return res.status(500).json({ message : "Server error" })
    
  }
}

export default updateUserProfile;