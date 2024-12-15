import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName : { type : String, required : true },
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


export const User = mongoose.model('Users', userSchema);
export const Codebase = mongoose.model('verification_codes', codeSchema);
export const Account = mongoose.model('Accounts', accountSchema);

export default { User, Codebase, Account };