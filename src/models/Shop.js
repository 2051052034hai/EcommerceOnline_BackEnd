import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    provinceCode: {
      type: String,
      require: true,
    },
    districtCode: {
      type: String,
      require: true,
    },
    wardCode: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);

export default Shop;
