import mongoose from "mongoose";

const LoginUserSchema = mongoose.Schema({
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  }
})
const LoggingUser = mongoose.model('loggingUser', LoginUserSchema)
export default LoggingUser;