const mongoose = require('mongoose');
let link = process.env.DATA_BASE;
mongoose.set('strictQuery', true);
mongoose.connect(link)
.then(()=>{
    console.log(`Databse connection successful`);
}).catch((e)=>{
    console.log(`Database connectiom failed`);
})
