import express from "express";
import dotenv from "dotenv";

dotenv.config();

const paymentAPI = express.Router();

paymentAPI.get("/payment/config", (req, res) => {
  const clientId = process.env.CLIENT_ID;
  return res.status(200).json({
    EC: 0,
    data: clientId,
  });
});

export default paymentAPI;
