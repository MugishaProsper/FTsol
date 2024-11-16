import express from 'express';
import { login, register, logout, verifyCode } from '../controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.post('/verify/code', verifyCode)

export default authRouter;