import Shop from "../models/Shop";
import Product from "../models/Product";
import aqp from "api-query-params";

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
  getShops: async (queryString) => {
    try {
      const page = queryString.page;

      // limit: số ptử cần lấy
      const { filter, limit, population } = aqp(queryString);

      // bỏ qua phần offset ptử
      let offset = (page - 1) * limit;

      delete filter.page;
      let result = await Shop.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();

      return result

    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getShopIdByUserId: async (userId) => {
    try {
      const shop = await Shop.findOne({ userId });

      return shop;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  getProductsByShopId: async (shopId, queryString) => {
    const page = queryString.page;

    const { filter, limit, population, sort } = aqp(queryString);

    let offset = (page - 1) * limit;

    delete filter.page;

    try {
      let productQuery = Product.find({ shop: shopId, ...filter });

      const products = await productQuery
        .populate(population)
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .exec();
      const productsByShopId = await Product.find({ shop: shopId });
      return {
        total: productsByShopId.length,
        products,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default ShopService;
