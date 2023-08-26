import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30s" }
  );

  return access_token;
};

const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

const refreshTokenJwtService = (token) => {
  try {
    jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
      if (err) {
        resolve({
          status: "ERR",
          message: "The authentication",
        });
      }
      const access_token = await genneralAccessToken({
        id: user?.id,
        isAdmin: user?.isAdmin,
      });
      return {
        status: "OK",
        message: "SUCESS",
        access_token,
      };
    });
  } catch (e) {
    return e;
  }
};

export { genneralAccessToken, genneralRefreshToken };
