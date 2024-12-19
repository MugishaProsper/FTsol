import express from 'express';
import { connectToDatabase } from './config/db.config.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import transactionRouter from './routes/transactions.routes.js';
import cors from 'cors';
import conversationRouter from './routes/conversation.routes.js';

const app = express();

const PORT = 5000;

app.use(cors())
app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/direct', conversationRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectToDatabase();
})