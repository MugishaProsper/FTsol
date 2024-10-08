import express from "express";
import dotenv from "dotenv"
import ConnectToDB from "./config/connection.js"
import CORS from 'cors'
import router from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import userRouter from "./routes/userRoutes.js";
import transaction_router from "./routes/transactionRoutes.js";


const app = express();
const port = 5000;
app.use(express.json());
app.use(CORS())

dotenv.config();
//middlewares to handle Authentication

app.use('/api', router, fileRouter);
app.use('/profile', userRouter)
app.use('/api/transactions', transaction_router)

ConnectToDB();
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

