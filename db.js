const mongoose=require('mongoose');
require('dotenv').config()
const mongoseuri=process.env.Mongo_url

const mongooseconnect=async()=>{
    mongoose.connect(mongoseuri,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    mongoose.connection
    .once("open",()=> console.log("connected"))
    .on("error",error =>{
        console.log("your error",error);
    });
}
module.exports=mongooseconnect;