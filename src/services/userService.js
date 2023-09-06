import User from "../models/User";
import bcrypt from "bcrypt";
import { genneralAccessToken, genneralRefreshToken } from "./jwtService";

const userService = {
  saveUser: async (user) => {
    try {
      const result = await User.create(user);
      return result;
    } catch (error) {
      return error;
    }
  },
  loginUser: async (userLogin) => {
    const { email, password } = userLogin;

    try {
      const user = await User.findOne({
        email: email,
      });
      if (user === null) {
        return {
          status: "ERR",
          message: "The user is not defined",
        };
      }
      const comparePassword = bcrypt.compareSync(
        userLogin.password,
        user.password
      );

      if (!comparePassword) {
        return {
          status: "ERR",
          message: "The password or user is incorrect",
        };
      }

      const access_token = await genneralAccessToken({
        id: user.id,
        role: user.role,
      });

      const refresh_token = await genneralRefreshToken({
        id: user.id,
        role: user.role,
      });

      // Trả về user sau khi đã bỏ password
      const { password, ...other } = user._doc;
      const newUserUpdate = Object.assign({}, other);

      return { ...newUserUpdate, access_token, refresh_token };
    } catch (e) {
      return e;
    }
  },
  getAllUsers: async (user) => {
    try {
      const result = await User.find({});
      return result;
    } catch (error) {
      return error;
    }
  },
};
export default userService;
