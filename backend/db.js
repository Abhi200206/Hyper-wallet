const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://vikkymsd777:TAm6HPFXUd4FIJig@cluster0.xpoedji.mongodb.net/paytm");
const uschema= new mongoose.Schema({
    username:String,
    firstname:String,
    lastname:String,
    password:String
})
const user=mongoose.model('user',uschema);
module.exports={
    user
}
