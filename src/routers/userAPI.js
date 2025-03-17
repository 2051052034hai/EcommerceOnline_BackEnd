import express from "express";
import userController from "../controllers/userController";
import authMiddleWare from "../middleware/authMiddleWare";
const userAPI = express.Router();

userAPI.post("/user/register", userController.postCreateUser);
userAPI.post("/user/login", userController.loginUser);
userAPI.post("/user/login-gg", userController.loginUserGG);
userAPI.post("/user/refresh", userController.refreshToken);

userAPI.get(
  "/users",
  authMiddleWare.verifyTokenAndAdminAuth,
  userController.getAllUsers
);
userAPI.get("/users/:id", userController.getUserByUserId);

userAPI.put(
  "/users",
  // authMiddleWare.verifyTokenAndAdminAuth,
  userController.updateUserById
);
userAPI.post("/change-password", userController.changePassword);

userAPI.delete(
  "/user/:id",
  authMiddleWare.verifyTokenAndAdminAuth,
  userController.deleteUser
);
userAPI.post("/user/checkedPassword", userController.checkedPassword);
userAPI.post("/user/resetPassword", userController.resetPassword);
userAPI.post("/user/resend-email", userController.sendMailResetPassword);
userAPI.get("/user/email", userController.getUserByEmail);
userAPI.post("/user/sendEmailRegister", userController.sendEmailRegister);

export default userAPI;
