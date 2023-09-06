import express from "express";
import categoryController from "../controllers/categoryController";
import authMiddleWare from "../middleware/authMiddleWare";

const categoryAPI = express.Router();

categoryAPI.get("/categories", categoryController.getAllCategory);
categoryAPI.post("/categories", categoryController.postCreateCategory);
categoryAPI.put("/categories", categoryController.putUpdateCategory);
categoryAPI.delete("/categories", categoryController.deleteCategory);

export default categoryAPI;
