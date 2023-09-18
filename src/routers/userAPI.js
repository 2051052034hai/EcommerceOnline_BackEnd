import express from "express";
import userController from "../controllers/useController";
const userAPI = express.Router();

userAPI.post("/user/register", userController.postCreateUser);
userAPI.post("/user/login", userController.loginUser);

userAPI.get("/users", userController.getAllUsers);
userAPI.get("/users/:id", userController.getUserByUserId);

userAPI.put("/users", userController.updateUserById);
userAPI.post("/change-password", userController.changePassword);

export default userAPI;
