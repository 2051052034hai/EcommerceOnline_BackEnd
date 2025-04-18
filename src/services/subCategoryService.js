import Category from "../models/Category.js";
import Subcategory from "../models/Subcategory.js";
import Product from "../models/Product.js";

import aqp from "api-query-params";

const SubCategoryService = {
  createSubCategory: async (categoryId, name) => {
    try {
      const result = await Subcategory.create({ name, categoryId });

      const parentCate = await Category.findById(categoryId);

      parentCate.subcategories.push(result._id);

      await parentCate.save();

      return result;
    } catch (error) {
      return error;
    }
  },
  updateSubCategory: async (subCategoryId, newName) => {
    try {
      const updatedCategory = await Subcategory.findByIdAndUpdate(
        subCategoryId,
        {
          name: newName,
        }
      );
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  },
  getSubCategory: async () => {
    try {
      const result = await Subcategory.find({});
      return result;
    } catch (error) {
      return error;
    }
  },
  deleteSubCategory: async (subcategoryId) => {
    try {
      // Tìm và xóa Subcategory
      const deletedSubcategory = await Subcategory.findByIdAndDelete(
        subcategoryId
      );

      // Nếu không tìm thấy Subcategory, trả về thông báo hoặc throw một lỗi
      if (!deletedSubcategory) {
        throw new Error("Subcategory not found");
      }

      const parentCate = await Category.findById(deletedSubcategory.categoryId);

      // Loại bỏ ID của Subcategory khỏi danh sách subcategories của Category
      parentCate.subcategories.pull(deletedSubcategory._id);

      // Lưu lại thay đổi vào đối tượng Category
      await parentCate.save();

      return deletedSubcategory;
    } catch (error) {
      throw error;
    }
  },
  getProductBySub: async (id, queryString) => {
    const page = queryString.page;

    const { filter, limit, population, sort } = aqp(queryString);

    let offset = (page - 1) * limit;

    delete filter.page;
    try {
      let productQuery = Product.find({ subcategory: id, ...filter });
      const product = await productQuery
        .populate(population)
        .sort(sort)
        .skip(offset)
        .limit(limit)
        .exec();
      const productsBySubId = await Product.find({ subcategory: id });
      return {
        total: productsBySubId.length,
        product,
      };
    } catch (error) {
      return error;
    }
  },
};

export default SubCategoryService;
