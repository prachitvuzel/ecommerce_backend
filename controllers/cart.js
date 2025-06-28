import CartModel from "../model/cart.js";
import User from "../model/user.js";
import Product from "../model/product.js"

async function AddToCart(req, res) {
    const productIdRaw = req.params.productId;
    const productToAdd = await Product.findById(productIdRaw)
  const quantity = Number(req.params.quantity);
    const user = await User.findById(req.user._id);
    

    if (!(user.userCart)) {
    console.log(productToAdd)
    const cartCreated = await CartModel.Cart.create({
      cartHolder: req.user._id,
      productList: [
        {
          ProductID: productToAdd._id,
          quantity: quantity,
        },
      ],
    });
      
    await User.findByIdAndUpdate(req.user._id, {userCart: cartCreated._id}) 
    return res.json({ msg: "Product successfully added into cart" });
  } else {
    const userCart = await CartModel.Cart.findById(user.userCart);
    const cartProducts = userCart.productList;
    cartProducts.push({
      ProductID: productToAdd._id ,
      quantity: quantity,
    });

    await CartModel.Cart.findOneAndUpdate(
      { _id: user.userCart },
      { productList: cartProducts }
    );
    return res.json({ msg: "Product successfully added into cart" });
  }
}

export default { AddToCart };
