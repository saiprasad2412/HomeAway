import express from "express";
import {verifyToken} from "../middleware/verifyToken.middleware.js"
import { addPostController, deletePostController, getPostController, getPostsController, updatePostController } from "../controllers/post.controller.js";
const postRouter = express.Router();

postRouter.get("/", getPostsController);
postRouter.get("/:id",getPostController);
postRouter.post('/add-post',verifyToken, addPostController);
postRouter.put("/:id", verifyToken, updatePostController);
postRouter.delete("/:id", verifyToken, deletePostController);


export default postRouter;