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

  findOrderItemsByShopId: async (shopId, queryString) => {
    const { filter, population } = aqp(queryString);

    delete filter.page;

    let result = await Order.find(filter).populate(population).exec();

    let orderArr = [];
    let total = 0;

    for (let order of result) {
       
      let data = order.orderItems.filter((item) => {
        return item.shop.toString() === shopId;
      });

      if (data.length > 0) {
        total += 1;
        orderArr.push({
          orderId: order._id,
          userId: order.userId,
          createdAt: order.createdAt,
          data,
        });
      }
    }

    return {
      total: total,
      result: orderArr,
    };
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
  updateOrderStatusPayment: async (shopId, orderId) => {
    try {
      const updatedOrder = await Order.findOneAndUpdate(
        {
          _id: orderId,
          "orderItems.shop": shopId,
        },
        { $set: { "orderItems.$[elem].statusPayment": true } },
        { new: true, arrayFilters: [{ "elem.shop": shopId }] }
      );
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
