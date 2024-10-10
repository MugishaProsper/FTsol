import express from "express";
import dotenv from "dotenv"
import ConnectToDB from "./config/connection.js"
import CORS from 'cors'
import router from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRoutes.js";
import userRouter from "./routes/userRoutes.js";
import http from 'http';
import { Server } from 'socket.io'

const app = express();
const socketio_server = http.createServer(app);
const io = new Server(socketio_server);
const port = 5000;
app.use(express.json());
app.use(CORS())

dotenv.config();

//middlewares to handle processes
app.use('/api', router, fileRouter);
app.use('/api/profile', userRouter)

// Socket.io activity listeners
io.on('connection', (socket) => {
  console.log('user connected : '+ socket.id);
  socket.on('joinRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} has joined room`)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected : ' + socket.id)
  })
})

ConnectToDB(); // connect to MongoDB
// Listen the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default io;
