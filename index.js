import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import cookieParser from "cookie-parser";
import CartModel from "./model/cart.js";
import Order from "./model/orders.js";
import User from "./model/user.js";
import middleware from "./middleware/authentication.js";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Database connected");
});

const port = process.env.PORT;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/success", middleware.baseAuthenticate("USER"), async (req, res) => {
  const user = await User.findById(req.user._id);

  const cartid = user.userCart;
  const cart = await CartModel.Cart.findById(cartid);
  const user_id = user._id;
  await Order.create({
    OrderBy: user_id,
    status: "pending",
    productList: cart.productList,
  });

  //delete cart after order
  await CartModel.Cart.findByIdAndDelete(cartid);

  return res.send("Payment done successfully");
});

app.get("/", (req, res) => {
  return res.end("hello");
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
