import express from 'express';
import signup from '../controllers/signupController.js';
import login from '../controllers/loginController.js';
import logout from '../controllers/logoutController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import verifyAccount from '../controllers/accountVerificationController.js';
import verifyEmail from '../controllers/emailVerificationController.js';
import { requestPasswordReset, resetPassword } from '../controllers/passwordResetController.js'

const router = express.Router();

router.post('/auth/register', signup);
router.post('/auth/login', login);
router.get('/account/verify/:token', verifyAccount)
router.post('/logout', authMiddleware, logout)
router.get('/account/email/verify/:token', authMiddleware, verifyEmail)
router.post('/acount/reset', requestPasswordReset)
router.post('/account/reset/:token', resetPassword)

export default router;