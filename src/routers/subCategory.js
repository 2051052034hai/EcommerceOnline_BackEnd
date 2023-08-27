import express from "express";
import subCategoryController from "../controllers/subCategoryController"; // Import your controller

const subCategoryAPI = express.Router();

subCategoryAPI.post(
  "/subcategories",
  subCategoryController.postCreateSubCategory
);
subCategoryAPI.post(
  "/subcategories",
  subCategoryController.postCreateSubCategory
);
subCategoryAPI.delete(
  "/subcategories",
  subCategoryController.deleteSubCategory
);
subCategoryAPI.get(
  "/subcategories/product",
  subCategoryController.getProductsBySub
);

// subCategoryAPI.put("/subcategories", subCategoryController.putUpdateCategory);
// subCategoryAPI.delete("/subcategories", subCategoryController.deleteCategory);

export default subCategoryAPI;
