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
      },
    ],

    statusPayment: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
OrderSchema.plugin(mongoose_delete, { overrideMethods: "all" });

Order = mongoose.model("Order", OrderSchema);

export default Order;
