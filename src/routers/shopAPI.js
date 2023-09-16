import express from "express";
import ShopController from "../controllers/shopController";
const shopAPI = express.Router();

shopAPI.post("/shop", ShopController.createShop);
shopAPI.get("/productShop/:id", ShopController.getProductsByShopId)
shopAPI.get("/shop/:id", ShopController.getShopIdByUserId)
shopAPI.get("/shop", ShopController.getAllShops)
export default shopAPI;
