import express from 'express';
import { authorize } from '../middlewares/auth.middlewares.js';
import { fetchAccountDetails } from '../controllers/account.controllers.js';

const transactionRouter = express.Router();

transactionRouter.get('/account', authorize, fetchAccountDetails);

export default transactionRouter