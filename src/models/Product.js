import mongoose from "mongoose";
import mongoose_delete from "mongoose-delete";

const Schema = mongoose.Schema;

const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  sold: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop",
    required: true,
  },
});

// Override all methods
productSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const Product = mongoose.model("Product", productSchema);

export default Product;
