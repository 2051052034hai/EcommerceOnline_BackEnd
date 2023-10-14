const jwt = require("jsonwebtoken");

const authMiddleWare = {
  //verify
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
      //Bearer 12355
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(419).json({
            EC: 1,
            data: "Token is not valid",
          });
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json({
        EC: 1,
        data: "you are not authenticated",
      });
    }
  },

  verifyTokenAndAdminAuth: async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      //Bearer 12355
      const accessToken = token.split(" ")[1];

      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(419).json({
            EC: 1,
            data: "Token is not valid",
          });
        }
        console.log(user);
        if (user.role === 3) {
          next();
        }
      });
    } else {
      return res.status(401).json({
        EC: 1,
        data: "you are not authenticated",
      });
    }
  },
};

export default authMiddleWare;
