const jwt = require('jsonwebtoken');
const registeredUser = require('../models/users');

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verify = jwt.verify(token,process.env.SECRET_KEY);
        
        const user = await registeredUser.findOne({_id:verify._id});
        next();
    }catch(e){
        res.status(400).send(e);
    }
};

module.exports = auth;