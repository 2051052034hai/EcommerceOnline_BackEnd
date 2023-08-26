import Shop from "../models/Shop";

const ShopService = {
  createShop: async (infoShop) => {
    try {
      const result = await Shop.create(infoShop);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default ShopService;
