import User from "../models/User";
import userService from "../services/userService";
import bcrypt from "bcrypt";

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
          data: "email đã tồn tại",
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
};

export default userController;
