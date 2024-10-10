import express from 'express';
import { signup, login, logout, verifyAccount, verifyEmail, requestPasswordReset, resetPassword } from '../controllers/authControllers.js';
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post('/auth/register', signup);
router.post('/auth/login', login);
router.get('/account/verify/:token', verifyAccount)
router.post('/logout', authMiddleware, logout)
router.get('/account/email/verify/:token', authMiddleware, verifyEmail)
router.post('/acount/reset', requestPasswordReset)
router.post('/account/reset/:token', resetPassword)

export default router;