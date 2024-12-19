import express from 'express';
import { authorize } from '../middlewares/auth.middlewares.js';
import { getConversations, getMessages, sendMessage } from '../controllers/conversation.controllers.js';

const conversationRouter = express.Router();

conversationRouter.get('/inbox', authorize, getConversations);
conversationRouter.get('/inbox/:id', authorize, getMessages);
conversationRouter.post('/inbox/:id', authorize, sendMessage);

export default conversationRouter