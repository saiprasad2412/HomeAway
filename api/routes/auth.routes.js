import express from 'express';
import { logOutController, loginController, registerController } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/verifyToken.middleware.js';

const authRouter = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/login",loginController);
authRouter.post("/logout",verifyToken,logOutController);

export default authRouter;