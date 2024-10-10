import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const transactionSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  transactionType : {
    type : String,
    enum : ['deposit', 'withdraw', 'transfer'],
    default : 'transfer',
    required : true
  },
  destination : {
    type : String,
    enum : ['FTsol Account', 'Paypal', 'Mobile Money'],
    default : 'FTsol Account',
    required : true
  },
  transactionAmount : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true,
    date : Date.now()
  }
}, { timestamps : true });

const connectedAccountInfo = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
  
})