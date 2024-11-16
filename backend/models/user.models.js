import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName : { type : String, required : true },
  lastName : { type : String, required : true },
  email : { type : String, required : true },
  password : { type : String, required : true },
});

const codeSchema = mongoose.Schema({
  account : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  verificationCode : { type : String, required : true },
  isVerified : { type : Boolean, default : false }
})

const accountSchema = mongoose.Schema({
  owner : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  balance : { type : Number, required : true },
  password : { type : String, required : true }
});

const transactionSchema = mongoose.Schema({
  senderId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  receiverId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  amount : { type : Number, default : 0.0 }
}, { timestamps : true });

export const Users = mongoose.model('Users', userSchema);
export const Codes = mongoose.model('Codes', codeSchema);
export const Accounts = mongoose.model('Accounts', accountSchema);
export const Transactions = mongoose.model('Transactions', transactionSchema);

export default { Users, Codes, Accounts, Transactions };