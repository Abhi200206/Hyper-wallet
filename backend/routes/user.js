const express=require("express");
const cors=require('cors');
const zod=require("zod");
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");
const {user,account}=require("../db");
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
userrouter.get('/check',authMiddleware,(req,res)=>{

        console.log(req.userId);
        res.json({value:true,userid:req.userId});
    


});
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
            try{
            let create1=await user.create({
                username:obj.username,
                password:obj.password,
                firstname:obj.firstname,
                lastname:obj.lastname
            })
            
                let create2=await account.create({
                    id:create1._id,
                    amount:Math.floor(Math.random()*10000)
                });
                let token=jwt.sign({username:obj.username},jwtpass);
            if(create1._id)
            {
                res.json({
                    message: "User created successfully",
                    token:"Bearer "+token,
                    send:true
                });
            }
            }
            catch(e)
            {
                    console.log(e);
                    res.json({message:"server busy please try again",send:false});
            }
            
    }
    else{
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
}})
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
    let username=req.headers.username;
    let result= await user.find().exec();
    let final_arr=result.filter((x)=>{
        if(x.username!=username)
        {
            return x;
        }
    })
    res.send(final_arr);
});
userrouter.get('/amount',async(req,res)=>{
    let userid=req.headers.username;
    let result=await user.findOne({username:userid});
    if(result._id)
    {
        let result2=await account.findOne({id:result._id});
        console.log("-------->",result2);
        res.json({amount:result2.amount,id:result._id});
    }
    else
    {
        res.status(500).json({msg:"error at  server"});
    }
});
userrouter.post('/send',async (req,res)=>{
    //using transactions
    const session = await mongoose.startSession();
    let senderid=req.body.senderid;
    let receiverid=req.body.receiverid;
    let amt=req.body.amount;
    try{
        session.startTransaction();
        let val1=await account.findOne({id:senderid});
        let value=await user.findById(senderid);
        if(val1.amount>=amt)
        {

             let val2=await account.findOne({id:receiverid});
             let op1=await account.findOneAndUpdate({id:senderid},{ $inc: { amount: -amt } });
             let op2=await account.findOneAndUpdate({id:receiverid},{ $inc: { amount: +amt } });
             await session.commitTransaction();
             res.json({value:"successfull",username:value.username});
        }
        else{
            await session.abortTransaction();
            res.json({err:"insufficent balance"});
        }

    }
    catch(err)
    {
        await session.abortTransaction();
        res.json({err:"error at server"});
        console.error(err);
    }
})
module.exports=userrouter;