import express from "express";
import userController from "../controllers/useController";
const userAPI = express.Router();

userAPI.post("/user/register", userController.postCreateUser);
userAPI.post("/user/login", userController.loginUser);

export default userAPI;
