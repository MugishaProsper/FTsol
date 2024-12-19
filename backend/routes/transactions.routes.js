import express from 'express';
import { authorize } from '../middlewares/auth.middlewares.js';
import { createTransactionAccount, getTransactionAccountDetails } from '../controllers/account.controllers.js';
import { getTransactionsHistory, transferAmount } from '../controllers/transaction.controllers.js';

const transactionRouter = express.Router();

transactionRouter.get('/account', authorize, getTransactionAccountDetails);
transactionRouter.post('/account/create', authorize, createTransactionAccount);
transactionRouter.post('/transfer/:id', authorize, transferAmount);
transactionRouter.get('/all', authorize, getTransactionsHistory);

export default transactionRouter