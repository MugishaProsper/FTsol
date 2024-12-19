import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  senderId : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  receiverId : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  message : { type : String, required : true }
}, { timestamps : true });

const conversationSchema = mongoose.Schema({
  participants : [{ type : mongoose.Schema.Types.ObjectId, ref : 'User'}],
  messages : [{type : mongoose.Schema.Types.ObjectId, ref : 'Messages'}],
}, { timestamps : true });

const notificationSchema = mongoose.Schema({
  receiverId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  message : { type : String, required : true },
  isRead : { type : Boolean, default : false }
}, { timestamps : true })

export const Message = mongoose.model('Messages', messageSchema);
export const Conversation = mongoose.model('Conversations', conversationSchema);
export const Notification = mongoose.model('Notification', notificationSchema);

export default { Message, Conversation, Notification };