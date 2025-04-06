import categoryService from "../services/categoryService.js";

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const result = await categoryService.getAllCategory(req.query);
      return res.status(200).json({
        EC: 0,
        data: result,
      });
    } catch (error) {}
  },
  postCreateCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const result = await categoryService.createCategory(name);
      return res.status(201).json({
        EC: 0,
        data: result,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  putUpdateCategory: async (req, res) => {
    const { name, id } = req.body;
    try {
      const result = await categoryService.updateCategory(id, name);
      return res.status(200).json({
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
  deleteCategory: async (req, res) => {
    const { id } = req.body;
    try {
      const result = await categoryService.deleteCategory(id);
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
};

export default categoryController;
