import express from "express";
import orderController from "../controllers/orderController";
import authMiddleWare from "../middleware/authMiddleWare";
const orderAPI = express.Router();

orderAPI.post("/order", orderController.createOrder);
orderAPI.get(
  "/order",
  authMiddleWare.verifyTokenAndAdminAuth,
  orderController.getAllOrder
);
orderAPI.get("/order/:id", orderController.getOrderById);
orderAPI.get("/order-by-user/:id", orderController.getAllOrderDetailsByUser);
orderAPI.get("/order-by-shop/:id", orderController.getAllOrderDetailsByShopId);
orderAPI.put("/order/status", orderController.updateOrderStatusPayment);
orderAPI.delete("/order/:id", orderController.cancelOrder);

export default orderAPI;
