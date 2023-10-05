import express from "express";
import userController from "../controllers/userController";
const userAPI = express.Router();

userAPI.post("/user/register", userController.postCreateUser);
userAPI.post("/user/login", userController.loginUser);
userAPI.post("/user/login-gg", userController.loginUserGG);
userAPI.post("/change-password", userController.changePassword);
userAPI.post("/user/resetPassword", userController.resetPassword);
userAPI.post("/user/resend-email", userController.sendMailResetPassword);

userAPI.get("/users", userController.getAllUsers);
userAPI.get("/users/:id", userController.getUserByUserId);
userAPI.get("/user/email", userController.getUserByEmail);

userAPI.put("/users", userController.updateUserById);

userAPI.delete("/user/:id", userController.deleteUser);

export default userAPI;
