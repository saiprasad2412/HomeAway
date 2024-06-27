import express from "express";
import { verifyToken } from "../middleware/verifyToken.middleware.js";
import { addMessageController} from "../controllers/message.controllers.js";
const mesageRouter=express.Router();

mesageRouter.post("/:chatId",verifyToken, addMessageController);

export default mesageRouter

