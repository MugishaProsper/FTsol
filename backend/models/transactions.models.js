import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
  senderAddress : { type : mongoose.Schema.Types.ObjectId, ref : 'Account', required : true },
  receiverAddress : { type : mongoose.Schema.Types.ObjectId, ref : 'Account', required : true },
  amount : { type : Number, default : 0.0 }
}, { timestamps : true });

const Transaction = mongoose.model('transactions', transactionSchema)

export default Transaction