const mongoose=require('mongoose');
const {Schema}=mongoose;

const PostSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    picture:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    createDate:{
        type:Date,
    },
})

const Post=mongoose.model('post',PostSchema);
module.exports=Post;