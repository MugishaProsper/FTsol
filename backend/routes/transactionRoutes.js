import express from "express";
import { createTransaction, getTransaction, updateTransaction, deleteTransaction } from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const transaction_router = express.Router();

transaction_router.post('/create', authMiddleware, createTransaction);
transaction_router.get('/all', authMiddleware, getTransaction)
transaction_router.put('/update/:id', authMiddleware, updateTransaction)
transaction_router.delete('/delete/:id', authMiddleware, deleteTransaction)

export default transaction_router
