import express from "express"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"
import cookieParser  from "cookie-parser"
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected")
})

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/products",productRouter)


app.get("/", (req,res) => {
    return res.end("hello")
})

app.listen(port,() => {
    console.log(`Server started at port: ${port}`)
})


