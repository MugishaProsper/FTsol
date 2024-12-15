import { sendAccountDetails } from "../config/email.config.js";
import { Account } from "../models/user.models.js";
import { generateRandomPassword } from "../plugins/generate.random.password.js";
import bcrypt from 'bcryptjs'


export const createTransactionAccount = async () => {
  try {
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 12);
    const accountDetails = {
      accountOwner : `${user.fullName} - ${user.email}`,
      password : `${password}`,
      message : `Please don't share this password with someone else. You can change it anytime`
    }
    await sendAccountDetails(user.email, accountDetails)
    const newAccount = new Account({ owner : userId, password : hashedPassword });
    await newAccount.save();
  } catch (error) {
    console.log(error.message);
  }
}
export const fetchAccountDetails = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;
  try {
    const account = await Account.findOne({ owner : userId });
    if(!account){
      return res.status(404).json({ message : "No account found "});
    };
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if(!isPasswordValid){
      return res.status(401).json({ message : "Incorrect password" });
    }
    return res.status(200).json(account);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message : "Server error" });
  }
};

export const transferAmount = async (req, res) => {
  const userId = req.user._id;
  const { receiverId, amount } = req.body;
  try {
    const senderAccount = await Account.findOne({ owner : userId });
    const receiverAccount = await Account.findOne({ owner : receiverId });
    if(!senderAccount || !receiverAccount){
      return res.status(404).json({ message : "Receiver account not found"})
    };
    if(senderAccount.balance >= amount){
      senderAccount.balance -= amount;
      receiverAccount.balance += amount;
    }
    await senderAccount.save();
    await receiverAccount.save();
    return res.status(200).json(senderAccount);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}