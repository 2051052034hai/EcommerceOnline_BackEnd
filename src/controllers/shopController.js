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
      const {id} = req.params;
      const products = await ShopService.getProductsByShopId(id, req.query);
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

  getShopIdByUserId: async (req, res) => {
    
    try {
      const { id } = req.params;
      
      const shop = await ShopService.getShopIdByUserId(id);
      return res.status(200).json({
        EC: 0,
        data: shop,
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
