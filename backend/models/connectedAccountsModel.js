import mongoose from 'mongoose';


const connectedAccountsSchema = new mongoose.Schema({
  accountId : {type : String, required : true},
  accountType : { type : String, required : true },
  dateConnected : { type : Date }
});

const connectedAccounts = new mongoose.model('connectedAccounts', connectedAccountsSchema)

export default connectedAccounts