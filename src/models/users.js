const mongoose = require('mongoose');

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
    }
});

const Userdata = new mongoose.model("User",userSchema);

module.exports = Userdata;