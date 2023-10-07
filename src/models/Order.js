import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: Number,
        shop: {
          type: Schema.Types.ObjectId,
          ref: "Shop",
        },
        statusPayment: {
          type: Boolean,
          default: false,
        },
        providerPayment: {
          type: Number,
          defautl: 0,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
OrderSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Order = mongoose.model("Order", OrderSchema);

export default Order;
