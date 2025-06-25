import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()


function generateToken(payload) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        ...payload
    }, process.env.secret_key)
}


function verifyToken(token) {
    return jwt.verify(token)
}

export default {generateToken, verifyToken}