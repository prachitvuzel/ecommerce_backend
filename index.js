import express from "express"
import mongoose, { mongo } from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.js"
dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected")
})

const port = process.env.PORT

app.use(express.urlencoded({extended:false}))
app.use("/user",userRouter)


app.get("/", (req,res) => {
    return res.end("hello")
})

app.listen(port,() => {
    console.log(`Server started at port: ${port}`)
})


