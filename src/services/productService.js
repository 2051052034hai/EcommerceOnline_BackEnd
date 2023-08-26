import Category from "../models/Category";
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
      result = result.map((product) => {
        const subcategoryNames = product.subcategory.map((subcategoryId) => {
          const matchingCategory = population.find(
            (category) => category._id.toString() === subcategoryId.toString()
          );
          return matchingCategory ? matchingCategory.name : "";
        });
        return {
          ...product._doc,
          subcategory: subcategoryNames,
        };
      });
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};

export default productService;
