import Transaction from "../models/transactions.models.js";
import { Account } from "../models/user.models.js";
import bcrypt from 'bcryptjs'

export const getTransactionsHistory = async (req, res) => {
  const userId = req.user._id;
  try {
    const userAccount = await Account.findOne({ user : userId }).select("-password");
    if(!userAccount){
      return res.status(404).json({ message : "account not found" });
    };

    const transactions = await Transaction.find({ $or : [{ senderAddress : userAccount._id }, { receiverAddress : userAccount._id }] });
    if(!transactions || transactions.length === 0){
      return res.status(404).json({ message : "No history found" })
    }
    return res.status(200).json(transactions);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : "Server error" });
  }
};

export const transferAmount = async (req, res) => {
  const userId = req.user._id;
  const receiverId = req.params;
  const { amount, password } = req.body;

  if(userId == receiverId.id){
    return res.status(403).json({ message : "accounts are the same" })
  }
  try {
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Transaction amount must be greater than 0" });
    }
    const userAccount = await Account.findOne({ user: userId });

    if (!userAccount) {
      return res.status(404).json({ message: "Account not found" });
    }

    const receiverAccount = await Account.findOne({ user : receiverId.id }).select("-password");

    if(!receiverAccount){
      return res.status(404).json({ message : "receiver account not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, userAccount.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    if (userAccount.balance < amount) {
      return res.status(403).json({ message: "Insufficient balance" });
    }

    const transaction = new Transaction({
      senderAddress: userAccount._id,
      receiverAddress: receiverAccount._id,
      amount: amount,
    });

    userAccount.balance -= amount;
    receiverAccount.balance += amount;

    await transaction.save();
    await userAccount.save();
    await receiverAccount.save();

    return res.status(200).json({ message: "Transaction successful", transaction });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};