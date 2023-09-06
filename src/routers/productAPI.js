import express from "express";
import productController from "../controllers/productController";
const productAPI = express.Router();

productAPI.post("/product", productController.postCreateProduct);
productAPI.get("/product", productController.getAllProducts);
productAPI.get("/product/:id", productController.getProductById);
productAPI.get("/products/topsale", productController.getProductTopSale);

productAPI.put("/product", productController.putUpddateProduct);

export default productAPI;
