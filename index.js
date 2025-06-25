import express from "express"

const app = express()

const port = process.env.PORT || 5000


app.get("/", (req,res) => {
    return res.end("hello")
})

app.listen(port,() => {
    console.log(`Server started at port: ${port}`)
})


