import Category from "../models/Category";
import Subcategory from "../models/Subcategory";

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
};

export default SubCategoryService;
