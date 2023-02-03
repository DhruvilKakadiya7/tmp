const mongoose = require('mongoose');
let link = 'mongodb+srv://Dhruvil:Dhruvil%40307@cluster0.l5qxki1.mongodb.net/LoginPage?appName=mongosh+1.6.2';
mongoose.set('strictQuery', true);
mongoose.connect(link)
.then(()=>{
    console.log(`Databse connection successful`);
}).catch((e)=>{
    console.log(`Database connectiom failed`);
})
