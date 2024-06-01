const mongoose=require("mongoose");
const { number } = require("zod");
//add the mongodb connection url using .env
mongoose.connect();
const uschema= new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})
const aschema=new mongoose.Schema({
    id:String,
    amount:Number
})
const user=mongoose.model('user',uschema);
const account=mongoose.model('Accounts',aschema);
module.exports={
    user,
    account
}
