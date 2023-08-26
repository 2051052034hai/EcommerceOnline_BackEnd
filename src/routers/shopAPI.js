import express from "express";
import ShopController from "../controllers/shopController";
const shopAPI = express.Router();

shopAPI.post("/shop", ShopController.createShop);

export default shopAPI;
