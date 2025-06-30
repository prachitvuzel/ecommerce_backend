import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  OrderBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered"],
    required: true,
  },
   productList: [
  
          {
              ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
              quantity:{type:Number, required:true, default:0}
        }
          
    ],
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Order = mongoose.model("order", OrderSchema);

export default Order;
