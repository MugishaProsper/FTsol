import mongoose, { mongo } from "mongoose";


const authTokenBlacklistSchema = new mongoose.Schema({
  token : {
    type : String,
    required : true
  },
  expiresAt : {
    type : Date,
    required : true
  }
}, { timestamps : true });

authTokenBlacklistSchema.index({ expiresAt : 1}, { expireAfterSeconds : 0 });

const authTokenBlacklist = mongoose.model("authTokenBlackList", authTokenBlacklistSchema)

export default authTokenBlacklist;