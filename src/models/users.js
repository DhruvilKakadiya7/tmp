const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    mobileno:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
    
});
userSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        console.log(token);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}
const Userdata = new mongoose.model("User",userSchema);

module.exports = Userdata;