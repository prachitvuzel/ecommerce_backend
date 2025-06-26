import express from "express";
import user_controllers from "../controllers/user.js";

const router = express.Router();

router.post("/signup", user_controllers.handleUserRegistration);

router.post("/login", user_controllers.handleUserlogin);

export default router;
