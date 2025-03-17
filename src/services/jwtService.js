import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const genneralAccessToken = async (payload) => {
  const access_token = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "30day" }
  );

  return access_token;
};

export const genneralRefreshToken = async (payload) => {
  const refresh_token = jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );

  return refresh_token;
};

export const refreshTokenJwtService = async (token) => {
  let access_token = "";
  let refresh_token = "";
  try {
    jwt.verify(token, process.env.JWT_REFRESH_KEY, async (err, user) => {
      if (err) {
        return {
          status: "ERR",
          message: "The authentication",
        };
      }
      access_token = await genneralAccessToken({
        id: user?.id,
        role: user?.role,
      });

      refresh_token = await genneralRefreshToken({
        id: user?.id,
        role: user?.role,
      });
    });
    return {
      access_token,
      refresh_token,
    };
  } catch (e) {
    return e;
  }
};
