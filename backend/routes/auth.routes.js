import express from 'express';
import { login, register, logout, verifyCode } from '../controllers/auth.controllers.js';
import { authorize } from '../middlewares/auth.middlewares.js';
import { deleteAccount, fetchProfileDetails } from '../controllers/user.controllers.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.post('/logout', logout);
authRouter.post('/verify/code', verifyCode);
authRouter.get('/profile', authorize, fetchProfileDetails);
authRouter.post('/profile/delete', authorize, deleteAccount)

export default authRouter;