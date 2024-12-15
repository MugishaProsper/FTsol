import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  senderId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  receiverId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  amount : { type : Number, default : 0.0 }
}, { timestamps : true });

const Transaction = mongoose.model('transactions', transactionSchema)

export default Transaction