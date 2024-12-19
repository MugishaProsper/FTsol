import { Conversation, Message } from "../models/conversation.models.js";
import { User } from "../models/user.models.js";

export const getConversations = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "user not found" })
    };
    const conversations = await Conversation.find({ participants : user._id }).sort({ updatedAt : -1 });
    return res.status(200).json(conversations);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" });
  }
};

export const sendMessage = async (req, res) => {
  const userId = req.user._id;
  const { id : friendId } = req.params;
  const { message } = req.body;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : 'user not found' })
    }
    let conversation = await Conversation.findOne({ participants : { $all : [ userId, friendId ] }});
    if(!conversation){
      conversation = await Conversation.create({
        participants : [user._id, friendId]
      })
    };
    let newMessage = new Message({ senderId : user._id, receiverId : friendId, message });
    if(newMessage){
      conversation.messages.push(newMessage._id);
    };
    await Promise.all([conversation.save(), newMessage.save()]);
    return res.status(200).json(newMessage);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" })
  }
}

export const getMessages = async (req, res) => {
  const userId = req.user._id;
  const friendId = req.params;

  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "user not found" });
    };
    const conversations = await Conversation.find({ participants : [userId, friendId.id] }).sort({ updatedAt : -1 }).populate("messages");
    return res.status(200).json(conversations);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Sever error" })
  }
}