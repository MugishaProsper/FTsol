import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config()

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  transactionType: {
    type: String,
    enum: ['deposit', 'withdraw', 'transfer'],
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: Date.now
  }
}, { timestamps: true });

transactionSchema.pre('save', function (next) {
  if (this.isModified('amount')) {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc', 
      Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
      Buffer.from(process.env.IV, 'hex')
    );
    
    let encrypted = cipher.update(this.amount, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    this.amount = encrypted;
  }
  next();
});

transactionSchema.methods.decryptAmount = function () {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc', 
    Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
    Buffer.from(process.env.IV, 'hex')
  );

  let decrypted = decipher.update(this.amount, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
