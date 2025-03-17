import User from "../models/User";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import {
  sendEmailResetPassword,
  sendEmailRegisterUser,
} from "../services/emailService";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import {
  genneralRefreshToken,
  genneralAccessToken,
} from "../services/jwtService";

const userController = {
  postCreateUser: async (req, res) => {
    const { email } = req.body;
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const check_email = await User.findOne({ email: email });

      if (check_email) {
        return res.status(400).json({
          EC: 1,
          data: "Email đã tồn tại",
        });
      }
      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      };

      let user = await userService.saveUser(newUser);

      return res.status(200).json({
        EC: 0,
        data: user,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);
      if (!email || !password) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is email",
        });
      }
      const response = await userService.loginUser(req.body);

      const { refresh_token, ...newReponse } = response;

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });
      return res.status(200).json({ ...newReponse, refresh_token });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },
  loginUserGG: async (req, res) => {
    try {
      const { email, username } = req.body;
      const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      const isCheckEmail = reg.test(email);
      if (!email || !username) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is required",
        });
      } else if (!isCheckEmail) {
        return res.status(200).json({
          status: "ERR",
          message: "The input is email",
        });
      }
      const response = await userService.loginUserGG(req.body);

      const { refresh_token, ...newReponse } = response;

      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
      });
      return res.status(200).json({ ...newReponse, refresh_token });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const result = await userService.getAllUsers();
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  getUserByUserId: async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await userService.getUserByUserId(userId);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  updateUserById: async (req, res) => {
    try {
      const { _id, username, updateAt, email, password } = req.body;
      let user = {};
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        user = {
          _id,
          username,
          updateAt,
          email,
          password: hashed,
        };
      } else {
        user = {
          _id,
          username,
          email,
          updateAt,
        };
      }
      const result = await userService.updateUserById(user);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { _id, currentPassword, newPassword } = req.body;

      // Tìm người dùng dựa trên username
      const user = await User.findOne({ _id });

      if (user && bcrypt.compareSync(currentPassword, user.password)) {
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

        await User.updateOne(
          { _id: user._id },
          { password: hashedNewPassword }
        );

        return res
          .status(200)
          .json({ message: "Thay đổi mật khẩu thành công" });
      } else {
        return res
          .status(401)
          .json({ message: "Mật khẩu hiện tại không đúng" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const result = userService.deleteUser({ _id: id });
      return res.status(204).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  refreshToken: async (req, res) => {
    try {
      let token = req.body.refresh;
      if (!token) {
        return res.status(400).json({
          status: "ERR",
          message: "The token is required",
        });
      }
      try {
        jwt.verify(token, process.env.JWT_REFRESH_KEY, async (err, user) => {
          if (err) {
            return {
              status: "ERR",
              message: "The authentication",
            };
          }
          const access_token = await genneralAccessToken({
            id: user?.id,
            role: user?.role,
          });

          const refresh_token = await genneralRefreshToken({
            id: user?.id,
            role: user?.role,
          });

          return res.status(200).json({
            access_token,
            refresh_token,
          });
        });
      } catch (e) {
        return e;
      }
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await userService.getUserByEmail(email);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const result = await userService.resetPassword(email, newPassword);

      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  sendMailResetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await sendEmailResetPassword(email);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  checkedPassword: async (req, res) => {
    try {
      const { _id, password } = req.body;
      const result = await userService.checkedPassword(_id, password);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
  sendEmailRegister: async (req, res) => {
    try {
      const { email, username } = req.body;
      const result = await sendEmailRegisterUser(email, username);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 0,
        data: error,
      });
    }
  },
};

export default userController;
