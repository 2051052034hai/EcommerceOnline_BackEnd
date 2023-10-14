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
// orderAPI.get("/product", productController.getAllProducts);
// orderAPI.get("/product/:id", productController.getProductById);
// orderAPI.get("/products/topsale", productController.getProductTopSale);
export default orderAPI;
