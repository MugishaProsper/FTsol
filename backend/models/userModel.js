import mongoose from "mongoose";
import connectedAccountsSchema from "./connectedAccountsModel.js";

const UserSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true
  },
  lastName : {
    type : String,
    required : true
  },
  username : {
    type : String,
    required : true,
    unique : true,
    minlength : 5
  },
  id_card : {
    type : String,
    required : true,
    unique : true
  },
  passport : {
    type : String,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    validate : {
      validator : function (v){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      message : props => `${props.value} is not a valid email format` 
    }
  },
  password : {
    type : String,
    required : true
  },
  profilePicture : {
    type : String
  },
  phone_number : {
    type : String,
    unique : true
  },
  isVerified : {
    type : Boolean,
    default : false
  },
  role : {
    type : String,
    enum : ["admin", "user"],
    default : 'user'
  },
  isEmailVerified : {
    type : Boolean,
    default : false
  },
  isDeactivated : {
    type : Boolean,
    default : false
  },
  connectedAccounts : [connectedAccountsSchema],


}, { timestamps : true })

const User = mongoose.model('User', UserSchema)

export default User;

