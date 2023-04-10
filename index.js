const express=require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/users.routes");
const cors=require("cors")
require("dotenv").config();


const app=express();


app.get("/",(req,res)=>{
    res.send("welcome Home")
})
app.use(cors())
app.use(express.json())

app.use("/user",userRouter)
app.listen(process.env.port,async()=>{
try{
    await connection
    console.log("connect with db")
}catch(err){
console.log(err)
}
    console.log(`server running on ${process.env.port}`)
})