import aqp from "api-query-params";
import Order from "../models/Order";

const orderService = {
  createOrder: async (order) => {
    const newOrder = await Order.create(order);
    return newOrder;
  },
  getAllOrder: async () => {
    const orders = await Order.find({});
    return orders;
  },
  findOrderByUserId: async (userId, queryString) => {
    const { population } = aqp(queryString);

    const orders = await Order.find({ userId: userId }).populate(population);
    return orders;
  },
  getOrder: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    let offset = (page - 1) * limit;
    delete filter.page;
    let result = await Order.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  },
  getOrderById: async (id, queryString) => {
    const { population } = aqp(queryString);

    const orders = await Order.findById(id)
      .populate({
        path: "orderItems.product",
        model: "Product",
      })
      .populate(population)
      .exec();
    return orders;
  },
};

export default orderService;
