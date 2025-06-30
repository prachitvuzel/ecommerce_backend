import express from "express";
import OrderController from "../controllers/order.js"
import middleware from "../middleware/authentication.js"

const router = express.Router()


router.get("/:cartid", middleware.baseAuthenticate("USER"),OrderController.paymentController)


export default router