import express from "express";
import subCategoryController from "../controllers/subCategoryController.js";

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
  "/subcategories/product/:id",
  subCategoryController.getProductsBySub
);
subCategoryAPI.get("/subcategories", subCategoryController.getAllSubCategory);
// subCategoryAPI.put("/subcategories", subCategoryController.putUpdateCategory);
// subCategoryAPI.delete("/subcategories", subCategoryController.deleteCategory);

export default subCategoryAPI;
