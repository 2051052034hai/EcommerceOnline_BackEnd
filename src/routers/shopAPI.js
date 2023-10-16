import express from "express";
import ShopController from "../controllers/shopController";
import authMiddleWare from "../middleware/authMiddleWare";
const shopAPI = express.Router();

shopAPI.post("/shop", ShopController.createShop);

shopAPI.get("/productShop/:id", ShopController.getProductsByShopId);
shopAPI.get("/shop/:id", ShopController.getShopIdByUserId);
shopAPI.get("/shop", ShopController.getAllShops);

shopAPI.put(
  "/shop",
  authMiddleWare.verifyTokenAndAdminAuth,
  ShopController.updateShopById
);
shopAPI.delete(
  "/shop/:id",
  authMiddleWare.verifyTokenAndAdminAuth,
  ShopController.deleteShopById
);
export default shopAPI;
