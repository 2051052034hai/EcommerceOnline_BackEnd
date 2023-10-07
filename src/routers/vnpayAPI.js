import express from "express";
import { VnPayController } from "../controllers/vnpayController";
const vnpayAPI = express.Router();

vnpayAPI.post("/create_payment_url", VnPayController.createPayment);
vnpayAPI.get("/vnpay_return", VnPayController.returnPayment);

export default vnpayAPI;
