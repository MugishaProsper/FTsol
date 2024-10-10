import User from "../models/userModel.js";

export const uploadProfilePicture = async (req, res) => {
  try {
    
    const userId = req.user.id;
    const imageUrl = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture : imageUrl }, { new : true })

    if(!updatedUser){
      return res.status(404).json({ message : 'User not found' });
    }
    res.status(200).json({ message : 'Profile picture updated successfully', profilePicture : updatedUser.profilePicture})
    
  } catch (error) {
    console.error('Error uploading profile picture: ', error.message)
    res.status(500).json({ message : 'Server error'})    
  }

}

export default uploadProfilePicture;