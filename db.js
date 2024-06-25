const mongoose=require('mongoose');
const mongoseuri="mongodb+srv://hharshchauhan1:nlRLirg6k4Kbk66w@blog.uwji5du.mongodb.net/?retryWrites=true&w=majority&appName=Blog"

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