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
  loginUserGG: async (userLogin) => {
    const { email, username } = userLogin;

    try {
      const user = await User.findOne({
        email: email,
      });
      if (user === null) {
        const newUser = await User.create({ email, username });
        const access_token = await genneralAccessToken({
          id: newUser.id,
          role: newUser.role,
        });

        const refresh_token = await genneralRefreshToken({
          id: newUser.id,
          role: newUser.role,
        });

        // Trả về user sau khi đã bỏ password
        const { password, ...other } = newUser._doc;
        const newUserUpdate = Object.assign({}, other);

        return { ...newUserUpdate, access_token, refresh_token };
      } else {
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
      }
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
  getUserByUserId: async (userId) => {
    try {
      const result = await User.findOne({ _id: userId });
      return result;
    } catch (error) {
      return error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const result = await User.findOne({ email: email });
      return result;
    } catch (error) {
      return error;
    }
  },
  updateUserById: async (user) => {
    const { _id } = user;
    try {
      const result = await User.updateOne({ _id }, user);
      return result;
    } catch (error) {
      return error;
    }
  },
  deleteUser: async (_id) => {
    try {
      const result = await User.deleteOne({ _id });
      return result;
    } catch (error) {
      return error;
    }
  },

  resetPassword: async (email, newPassword) => {
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        await User.updateOne(
          { _id: user._id },
          { password: hashedNewPassword }
        );
        return user;
      } else {
        return {
          status: "ERR",
          message: "Email này chưa được đăng kí",
        };
      }
    } catch (error) {
      return error;
    }
  },
  checkedPassword: async (userId, password) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return false;
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      return isMatch;
      
    } catch (error) {
      return false;
    }
  },
};
export default userService;
