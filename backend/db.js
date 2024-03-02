const mongoose=require("mongoose");
const { number } = require("zod");
mongoose.connect("mongodb+srv://vikkymsd777:TAm6HPFXUd4FIJig@cluster0.xpoedji.mongodb.net/paytm");
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
