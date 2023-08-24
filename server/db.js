const mongoose=require('mongoose');
const mongoseuri="mongodb://127.0.0.1:27017/Blog"

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