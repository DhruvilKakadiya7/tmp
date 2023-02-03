const { equal } = require('assert');
const express = require('express');
const app = express();
const path = require('path');
require('./db/connect');
const User = require('./models/users');
const hbs = require('hbs');
const exp = require('constants');
const bcrypt = require('bcryptjs');
const { cp } = require('fs');

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname,"../public")
const tmplates_path = path.join(__dirname,"../templates/views")//LoginPage\templates\partials
const partials_path = path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",tmplates_path);
hbs.registerPartials(partials_path);
app.get('/',(req,res)=>{
    // console.log(__dirname);
    res.render("index");
    // res.send("Hello from other sides");
});
app.get('/index',(req,res)=>{
    res.render("index");
});
app.post('/',async (req,res)=>{
    try{
        const email = req.body.email;
        const userEmail = await User.findOne({email:email});
        const password = req.body.pass;
        const ok = userEmail.password;
        const matching = await bcrypt.compare(req.body.pass,userEmail.password);
        console.log(matching);
        if(userEmail){
            if(matching){
                console.log("LOGIN SUCCESSFULL");
                res.status(201).redirect("login");
            }
            else{
                res.status(400).send("Incorrect Email or password");
            }
        }
        else{
            res.status(400).send("Incorrect Email or password");
        }
    }catch(e){
        res.status(400).send("Incorrect Email or password");
    }
});

app.post('/index',async (req,res)=>{
    try{
        const email = req.body.email;
        const userEmail = await User.findOne({email:email});
        const password = req.body.pass;
        const ok = userEmail.password;
        const matching = await bcrypt.compare(req.body.pass,userEmail.password);
        console.log(matching);
        if(userEmail){
            if(matching){
                console.log("LOGIN SUCCESSFULL");
                res.status(201).redirect("login");
            }
            else{
                // alert("Register First");
                res.status(400).send("Incorrect Email or password");
            }
        }
        else{
            // alert("Register First");
            res.status(400).send("Incorrect Email or password");
        }
    }catch(e){
        // alert("Register First");
        res.status(400).send("Incorrect Email or password");
    }
});

app.get('/register',(req,res)=>{
    res.render("register");
});

app.post("/register",async(req,res)=>{
    try{
        const pass = await bcrypt.hash(req.body.password,10);
        const cpass = await bcrypt.hash(req.body.confirmpassword,10);
        console.log(pass,cpass);
        flag=0;
        if(req.body.password==req.body.confirmpassword){
            flag=1;
        }
        if(flag==1){
            const miniUser = new User({
                firstname: req.body.firstname,
                lastname : req.body.lastname,
                mobileno : req.body.mobileno,
                email :req.body.email,
                password:pass,
                confirmpassword:cpass 
            });
            console.log(miniUser);
            const registered = await miniUser.save();
            res.status(201).redirect("index");
        }
        else{
            res.send("Passwords are not matching");
        }
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});