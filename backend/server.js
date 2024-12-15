import express from 'express';
import { connectToDatabase } from './config/db.config.js';
import authRouter from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import transactionRouter from './routes/transactions.routes.js';

const app = express();

const __dirname = path.resolve();
const PORT = 5000;

app.use(express.json());
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api', transactionRouter)

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase();
})