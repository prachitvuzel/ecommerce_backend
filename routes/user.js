import express from "express"
import handleUserRegistration from "../controllers/user.js"


const router = express.Router()


router.post("/signup", handleUserRegistration)


export default router