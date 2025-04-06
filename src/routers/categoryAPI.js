import express from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";

const categoryAPI = express.Router();

categoryAPI.get("/categories", categoryController.getAllCategory);
categoryAPI.post(
  "/categories",
  authMiddleWare.verifyTokenAndAdminAuth,
  categoryController.postCreateCategory
);
categoryAPI.put(
  "/categories",
  authMiddleWare.verifyTokenAndAdminAuth,
  categoryController.putUpdateCategory
);
categoryAPI.delete(
  "/categories",
  authMiddleWare.verifyTokenAndAdminAuth,
  categoryController.deleteCategory
);

export default categoryAPI;
