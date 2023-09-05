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

  getProductsByShopId: async (req, res) => {
   
    try {
      const { id:userId } = req.params;
      const shopId = await ShopService.getShopIdByUserId(userId);
      const products = await ShopService.getProductsByShopId(shopId, req.query);
      return res.status(200).json({
        EC: 0,
        data: products,
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
