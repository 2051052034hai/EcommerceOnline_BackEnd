import Product from "../models/Product";
import aqp from "api-query-params";

const productService = {
  createProduct: async (data) => {
    try {
      let result = await Product.create(data);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getProducts: async (queryString) => {
    try {
      const page = queryString.page;

      // limit: số ptử cần lấy
      const { filter, limit, population } = aqp(queryString);

      // bỏ qua phần offset ptử
      let offset = (page - 1) * limit;

      delete filter.page;
      let result = await Product.find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();
      const products = await Product.find({});
      return {
        result,
        total: products.length,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getProductById: async (id, queryString) => {
    try {
      // limit: số ptử cần lấy
      const { population } = aqp(queryString);

      let result = await Product.findById(id).populate(population);

      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  getProductTopSale: async () => {
    try {
      const products = await Product.find({}).sort({ sold: -1 }).limit(10);
      return products;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default productService;
