import { Accounts, Transactions, Users } from "../models/user.models"
import { generateRandomPassword } from "../plugins/generate.random.password";

export const createTransactionAccount = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;
  try {
    // Find if another account with similar owner exists
    const existingAccount = await Accounts.findOne({ owner : userId });
    if(existingAccount){
      return res.status(400).json({ message : "Account already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAccount = new Accounts({ owner : userId, password : hashedPassword });
    await newAccount.save();
    return res.status(200).json({ message : "Account created successfully", newAccount })
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error"})
  }
}
export const fetchAccountDetails = async (req, res) => {
  const userId = req.user._id;
  const { password } = req.body;
  try {
    const account = await Accounts.findOne({ owner : userId });
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

export const notify = async (receiverId, message) => {
  
}

export const transferAmount = async (req, res) => {
  const userId = req.user._id;
  const { receiverId, amount } = req.body;
  try {
    const senderAccount = await Accounts.findOne({ owner : userId });
    const receiverAccount = await Accounts.findOne({ owner : receiverId });
    if(!senderAccount || !receiverAccount){
      return res.status(404).json({ message : "Receiver account not found"})
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}