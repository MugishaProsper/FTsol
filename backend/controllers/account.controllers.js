import Transaction from "../models/transactions.models.js";
import { Account, User } from "../models/user.models.js";

export const createTransactionAccount = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "user not found" });
    }
    const existingAccount = await Account.findOne({ user : userId });
    if(existingAccount){
      return res.status(403).json({ message : "transaction account already exists" });
    }
    const newAccount = new Account({ user : user._id, password : user.password });
    await newAccount.save();
    return res.status(200).json(newAccount);
  } catch (error) {
    console.error(error.message);
    return res.status({ message : "Error creating account" });
  }
};

export const getTransactionAccountDetails = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "user not found" });
    };
    const account = await Account.findOne({ user : userId }).select("-password");
    if(!account){
      return res.status(404).json({ message : "no such account found" });
    };
    return res.status(200).json(account);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "server error" });
  }
}