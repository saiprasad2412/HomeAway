import express from 'express';
import { logOutController, loginController, registerController } from '../controllers/auth.controllers.js';

const authRouter = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/login",loginController);
authRouter.post("/logout",logOutController);

export default authRouter;