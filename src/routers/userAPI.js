import express from "express";
import userController from "../controllers/userController";
const userAPI = express.Router();

userAPI.post("/user/register", userController.postCreateUser);
userAPI.post("/user/login", userController.loginUser);
userAPI.post("/user/login-gg", userController.loginUserGG);

userAPI.get("/users", userController.getAllUsers);
userAPI.get("/users/:id", userController.getUserByUserId);

userAPI.put("/users", userController.updateUserById);
userAPI.post("/change-password", userController.changePassword);

userAPI.delete("/user/:id", userController.deleteUser);

export default userAPI;
