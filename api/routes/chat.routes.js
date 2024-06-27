import express from 'express';
import { verifyToken } from '../middleware/verifyToken.middleware.js';
import { addChatController, getChatController, getChatsController, readChatController } from '../controllers/chat.controllers.js';
const mesageRouter=express.Router();

mesageRouter.get("/", verifyToken, getChatsController);
mesageRouter.get("/:id", verifyToken, getChatController);
mesageRouter.post("/",verifyToken,addChatController);
mesageRouter.put('/read/:id', verifyToken, readChatController);

export default mesageRouter