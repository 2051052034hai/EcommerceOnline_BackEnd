import express from "express";
import ShopController from "../controllers/shopController";
const shopAPI = express.Router();

shopAPI.post("/shop", ShopController.createShop);
shopAPI.get("/shop/:id", ShopController.getProductsByShopId)
export default shopAPI;
