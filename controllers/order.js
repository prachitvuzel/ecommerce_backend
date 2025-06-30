import dotenv from "dotenv";
import CartModel from "../model/cart.js";
import Product from "../model/product.js";
import Order from "../model/orders.js";
import Stripe from "stripe";

dotenv.config();

const stripe = new Stripe(process.env.Stripe_key);

async function paymentController(req, res) {
    try {
        const cart = await CartModel.Cart.findById(req.params.cartid);

        let productlist = cart.productList;

        let quantities = productlist.map((product) => product.quantity);
        async function productMap(product) {
            let oneproduct = await Product.findById(product.ProductID);
            return oneproduct;
        }
        let producItems = productlist.map(productMap);
        let resolvedProductItems = await Promise.all(producItems);
        let prices = resolvedProductItems.map((product) => {
            return product.price;
        });

        const total = prices.reduce(
            (sum, price, index) => sum + price * quantities[index],
            0
        );

        const session = await stripe.checkout.sessions.create({
            success_url: process.env.SUCESS_URL,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: resolvedProductItems
                                .map((product) => product.ProductName)
                                .reduce(
                                    (name, productname, index) => name + "&" + productname,
                                    ""
                                ),
                        },
                        unit_amount: total,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
        });

      
      //Creates order as status pending
        // await Order.create({
        //     OrderBy: req.user._id,
        //     status: "pending",
        //     productList: cart.productList
         
        // })

        // //delete cart after order
        // await CartModel.Cart.findByIdAndDelete(req.params.cartid)
    
    
    return res.redirect(session.url);
}
  catch (error) {
    console.log(error);
  }
}

export default { paymentController };
