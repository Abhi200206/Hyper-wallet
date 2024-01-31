const express = require("express");
const app=express();
const jpass=require("./config")
const cors=require("cors");
const jsonwebtoken=require("jsonwebtoken");
const user=require('./db');
const newRouter=require("./routes/index");
console.log(jpass);
app.use("/api/v1",newRouter)
app.use(express.json());
app.use(cors());
app.listen(3000,()=>{
    console.log("app running!!")
});


