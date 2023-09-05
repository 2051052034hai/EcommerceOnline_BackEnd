import express from "express";
import dotenv from "dotenv";

dotenv.config();

const paymentAPI = express.Router();

paymentAPI.get("/payment/config", (req, res) => {
  return res.status(200).json({
    EC: 0,
    data: process.env.CLIENT_ID,
  });
});

export default paymentAPI;
