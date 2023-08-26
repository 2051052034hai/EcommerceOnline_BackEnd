import ShopService from "../services/shopService";

const ShopController = {
  createShop: async (req, res) => {
    try {
      const result = await ShopService.createShop(req.body);
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        error: error.message,
      });
    }
  },
};

export default ShopController;
