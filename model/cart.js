import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    cartHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    productList: [

        {
            ProductID: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
            quantity:{type:Number, required:true, default:0}
      }
        
    ]
})

const Cart = mongoose.model("cart", CartSchema)

export default {Cart}