import express from "express";
import productController from "../controllers/productController.js";
const productAPI = express.Router();

productAPI.post("/product", productController.postCreateProduct);
productAPI.get("/product", productController.getAllProducts);
productAPI.get("/product/:id", productController.getProductById);
productAPI.get("/products/topsale", productController.getProductTopSale);

productAPI.put("/product", productController.putUpddateProduct);
productAPI.delete("/product/:id", productController.deleteProduct);

export default productAPI;
