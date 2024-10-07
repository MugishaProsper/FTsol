import express from 'express';
import signup from '../controllers/signupController.js';
import login from '../controllers/loginController.js';
import logout from '../controllers/logoutController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/auth/register', signup);
router.post('/auth/login', login);
router.post('/logout', authMiddleware, logout)

export default router;