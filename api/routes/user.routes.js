// import express from "express";
// import {verifyToken} from "../middleware/verifyToken.middleware.js";
// import { getUserController,deleteUserController, getUsersController, updateUserController } from "../controllers/user.controllers.js";

// const router = express.Router();

// // router.get("/", getUsersController);
// // router.get("/search/:id", verifyToken, getUserController);
// router.put("/:id", verifyToken, updateUserController);
// router.delete("/:id", verifyToken, deleteUserController);
// // router.post("/save", verifyToken, savePost);
// // router.get("/profilePosts", verifyToken, profilePosts);
// // router.get("/notification", verifyToken, getNotificationNumber);

// export default router;

import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  profilePosts,
  savePost,
  updateUser,
} from "../controllers/user.controllers.js";
import {verifyToken} from "../middleware/verifyToken.middleware.js";

const router = express.Router();

router.get("/", getUsers);
// router.get("/search/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/savePost", verifyToken, savePost);
router.get("/profilePosts", verifyToken, profilePosts);
// router.get("/notification", verifyToken, getNotificationNumber);

export default router;