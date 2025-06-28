import express from "express"
import CartControllers from "../controllers/cart.js"
import middleware from "../middleware/authentication.js"


const router = express.Router()


router.post("/addtocart/:productId/:quantity",middleware.baseAuthenticate("USER"), CartControllers.AddToCart)








export default router