import express from "express";
import {
  checkUser,
  createUserProfile,
  deleteUserProfile,
  getUserProfile,
  healthCheck,
  updateUserProfile,
} from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/health", healthCheck);
userRouter.post("/check", checkUser);

// dynamic routes
userRouter.post("/", createUserProfile);
userRouter.patch("/:id", updateUserProfile);
userRouter.get("/:id", getUserProfile);
userRouter.delete("/:id", deleteUserProfile);

export default userRouter;
