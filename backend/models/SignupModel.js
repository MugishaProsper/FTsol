import mongoose from "mongoose";

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
  }

}, { timestamps : true })

const User = mongoose.model('User', UserSchema)

export default User;

