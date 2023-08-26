import aqp from "api-query-params";
import Category from "../models/Category";

const categoryService = {
  getAllCategory: async (queryString) => {
    console.log(queryString);
    try {
      const { population, filter } = aqp(queryString);
      const result = await Category.find(filter).populate(population).exec();
      return result;
    } catch (error) {
      return error;
    }
  },

  createCategory: async (name) => {
    try {
      const newCategory = Category.create({
        name: name,
        subcategories: [], // Bắt đầu với danh sách rỗng cho danh mục con
      });

      return newCategory;
    } catch (error) {
      throw error;
    }
  },

  updateCategory: async (categoryId, newName) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
        name: newName,
      });
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      return deletedCategory;
    } catch (error) {
      throw error;
    }
  },
};

export default categoryService;
