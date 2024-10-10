import express from 'express';

import { getNotifications, markAsRead, createNotification } from "../controllers/notificationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const notification_router = express.Router();

notification_router.post('/create', authMiddleware, createNotification);
notification_router.get('/all', authMiddleware, getNotifications);
notification_router.patch('/all/:id', authMiddleware, markAsRead);


export default notification_router;