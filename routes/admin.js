import express from "express"
import middleware from "../middleware/authentication.js"
import adminControllers from "../controllers/admin.js"

const router = express.Router()





router.get("/viewusers",middleware.baseAuthenticate("ADMIN"),middleware.adminAuthenticate,adminControllers.ViewUsers)
router.get("/updateOrderStatus/:orderid/:status",middleware.baseAuthenticate("ADMIN"),middleware.adminAuthenticate,adminControllers.updateOrderStatus)



export default router



