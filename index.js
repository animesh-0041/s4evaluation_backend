const express=require("express");
const {connection}=require("./db")

const {usersRoute}=require("./routes/users.route")
const {postRoute}=require("./routes/posts.route")
require('dotenv').config()
const {auth}=require("./middlewars/auth.middleware")
const cors = require('cors')

const app=express();
app.use(express.json())
app.use(cors())
app.use("/users",usersRoute)
app.use(auth)
app.use("/posts",postRoute)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection;
        console.log("connected to DB");
    } catch (error) {
        console.log(error);
    }
    console.log(`Runing at ${process.env.port}`)
})