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

const Messages = mongoose.model('Messages', messageSchema);
const Conversations = mongoose.model('Conversations', conversationSchema);
const Notifications = mongoose.model('Notification', notificationSchema);

export default { Messages, Conversations, Notifications };