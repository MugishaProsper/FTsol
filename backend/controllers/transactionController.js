import Transaction from "../models/transactionModel.js";

export const createTransaction = async (req, res) => {
  const { transactionType , amount, description } = req.body;
  const userId = req.user.id;

  try {

    const newTransaction = new Transaction({
      user : userId,
      transactionType,
      amount,
      description
    })

    await newTransaction.save()
    res.status(201).json({ message : 'Transaction created successfully', transaction : newTransaction });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message : 'Server error', error : error.message })
  }
}

export const getTransaction = async (req, res) => {
  const userId = req.user.id;

  try {
    const transactions = await Transaction.find({ user : userId });

    const decryptedTransaactions = transactions.map(txn => {
      return { ...txn.toObject(), amount : txn.decryptAmount() };
    });

    res.status(200).json(decryptedTransaactions)
    
  } catch (error) {

    res.status(500).json({ message : 'Server error : ', error : error.message })
    
  }
};

export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.params;

  try {
    
    const transaction = await Transaction.findOne({ _id : id, user : userId });

    if(!transaction){
      return res.status(404).json({ message : 'Transaction not found' })
    }

    const { amount, description } = req.body;

    if(amount){
      transaction.amount = amount;
    }
    if(description){
      transaction.description = description;
    }
    await transaction.save();
    res.status(200).json({ message : 'Transaction updated successfully' });
    
  } catch (error) {
    res.status(500).json({ message : 'Server error' });
  }
}

export const deleteTransaction = async (req, res) => {

  const transactionId = req.params.id;
  const userId = req.user.id;

  try {
    const transaction = await Transaction.findOneAndDelete({ _id : transactionId , user : userId});

    if(!transaction){
      return res.status(404).json({ message : 'Transaction not found' })
    }

    res.status(200).json({ message : 'Transaction deleted successfully' })
    
  } catch (error) {

    console.error(error.message)
    res.status(500).json({ message : 'Server error', error : error.message })
    
  }

}