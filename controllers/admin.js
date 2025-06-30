import User from "../model/user.js";
import Order from "../model/orders.js";

async function ViewUsers(req, res) {
  const allUsers = await User.find();
  return res.json(allUsers);
}

async function updateOrderStatus(req, res) {
  try {
    const OrderID = req.params.orderid;
    const status = req.params.status;
    const statusOptions = ["pending", "shipped", "delivered"];
    if (!statusOptions.includes(status))
      return res.json({ msg: "Invalid Order status" });
    await Order.findByIdAndUpdate(OrderID, { status: status });
    return res.json({ msg: "status successfully updated" });
  } catch (error) {
    return res.json({ msg: "Some Error Occured" });
  }
}

export default { ViewUsers, updateOrderStatus };
