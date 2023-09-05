import orderService from "../services/orderService";

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, orderItems, total } = req.body;
      if (!userId || !orderItems || !total) {
        return res.status(400).json({
          EC: 1,
          error: "The input is required",
        });
      }
      const response = await orderService.createOrder(req.body);
      return res.status(200).json({
        EC: 0,
        data: response,
      });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },

  getAllOrderDetailsByUser: async (req, res) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        return res.status(400).json({
          EC: 1,
          error: "The input is required",
        });
      }
      const response = await orderService.findOrderByUserId(userId, req.query);
      return res.status(200).json({
        EC: 0,
        data: response,
      });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },

  getDetailsOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(200).json({
          status: "ERR",
          message: "The userId is required",
        });
      }
      const response = await OrderService.getOrderDetails(orderId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },

  cancelOrderDetails: async (req, res) => {
    try {
      const data = req.body.orderItems;
      const orderId = req.body.orderId;
      if (!orderId) {
        return res.status(200).json({
          status: "ERR",
          message: "The orderId is required",
        });
      }
      const response = await OrderService.cancelOrderDetails(orderId, data);
      return res.status(200).json(response);
    } catch (e) {
      // console.log(e)
      return res.status(404).json({
        message: e,
      });
    }
  },

  getAllOrder: async (req, res) => {
    try {
      const data = await orderService.getAllOrder();
      return res.status(200).json(data);
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  },
};

export default orderController;
