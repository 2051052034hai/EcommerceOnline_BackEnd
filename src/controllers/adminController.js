
import adminService from "../services/adminService.js";

const adminController = {
  loginAdmin: async (req, res) => {
    try {
      const result = await adminService.loginUser(req.body);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(200).json({
        EC: 1,
        data: error,
      });
    }
  },
}

export default adminController