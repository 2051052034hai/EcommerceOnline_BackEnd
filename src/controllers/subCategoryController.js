import categoryService from "../services/categoryService.js";
import SubCategoryService from "../services/subCategoryService.js";

const categoryController = {
  getAllSubCategory: async (req, res) => {
    try {
      const result = await SubCategoryService.getSubCategory();
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
  postCreateSubCategory: async (req, res) => {
    const { name, categoryId } = req.body;
    try {
      const result = await SubCategoryService.createSubCategory(
        categoryId,
        name
      );
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
  putUpdateCategory: async (req, res) => {
    const { name, id } = req.body;
    try {
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        error: error.message,
      });
    }
  },
  deleteSubCategory: async (req, res) => {
    const { subCategoryId } = req.body;
    try {
      const result = await SubCategoryService.deleteSubCategory(subCategoryId);
      return res.status(204).json({
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

  getProductsBySub: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await SubCategoryService.getProductBySub(id, req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        EC: 1,
        data: error,
      });
    }
  },
};

export default categoryController;
