import mongoose from "mongoose";
import User from "./user.js";

const ProductSchema = new mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    productImageURL: {
      type: String,
      required: true,
      default: "productImages/default.png",
    },
    category: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", ProductSchema);

export default Product;
