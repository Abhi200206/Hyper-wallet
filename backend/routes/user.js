const express=require("express");
const cors=require('cors');
const zod=require("zod");
const jwt=require("jsonwebtoken");
const {user}=require("../db");
const jwtpass=require("../config");
const {authMiddleware}=require('../middleware');
const userrouter=express.Router();
const schema= zod.object({
    username:zod.string(),
    password:zod.string(),
    firstname:zod.string(),
    lastname:zod.string()
})
const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
console.log("jwt pass: " ,jwtpass );
userrouter.use(express.json());
userrouter.use(cors());
userrouter.post('/signup',async (req,res)=>{
    let obj=req.body;
    console.log("obj: ",obj);
    let result=schema.safeParse(obj);
    console.log("answer: ",result,);
    if(result.success)
    {
        let verdict=await user.findOne({
            username:obj.username
        })
        if(!verdict)
        {
            let create=await user.create({
                username:obj.username,
                password:obj.password,
                firstname:obj.firstname,
                lastname:obj.lastname
            })
            let token=jwt.sign({username:obj.username},jwtpass);
            if(create._id)
            {
                res.json({
                    message: "User created successfully",
                    token:"Bearer "+token,
                    send:true
                });
            }
            else
            {
                res.json({message:"server busy please try again",send:false});
            }
        }
        else{
            res.json({message:"user already available"});
        }

    }
    else{
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
})
userrouter.post('/signin',async (req,res)=>{
    let obj=req.body;
    let verdict=await user.findOne({
        username:obj.username,
        password:obj.password
    })
    if(verdict)
    {
        let token=jwt.sign({username:obj.username},jwtpass);
        res.json({token:"Bearer "+token,send:true})
    }
    else{
        res.status(411).json({
            message: "Error while logging in",
            send:false
        })
        
    }
})

userrouter.put('/:name',authMiddleware,async (req,res)=>{
 console.log("helo");   
 console.log("params: ",req.params.name);
       const { success } = updateBody.safeParse(req.body)
        if (!success) {
            res.status(411).json({
                message: "Error while updating information"
            })
        }
    
        await user.updateOne({$set:req.body}, {
            _id: req.params.name
        })
    
        res.json({
            message: "Updated successfully"
        })
    
})
userrouter.get('/',async (req,res)=>{
    let result= await user.find().exec();
    console.log(result);
    res.send(result);
})
module.exports=userrouter;