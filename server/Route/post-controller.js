const express=require('express');
const userverification=require("../Middleware/verifyuser")
const router=express.Router();
const {body,validationResult}=require('express-validator');
const Post=require('../Model/Post')
const User=require('../Model/User')
router.post("/createpost",userverification,[
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description', "Description must be atleast 5 letters ").isLength({min:5}),
    body('picture', "Provide a picture for your blog"),
],async(req,res)=>{
    const validation=validationResult(req);
    console.log(req.body.picture)
    let success=false;
    // if(!validation.isEmpty()){
    //     return res.status(500).json({success,validation,error:"Validation fails"});
    // }
    try {
        console.log(req.user.user.id);
        const userinfo=await User.findById(req.user.user.id)
        console.log(userinfo.name);
        const {title,description,picture}=req.body;
        const post=new Post({title,description,picture,name:userinfo.name});
        const savenote=await post.save();
        // console.log(savenote);
        success=true;
        return res.status(200).json({success,msg:"Post Saved sucessfully"});
    } catch (error) {
        return res.status(500).send({error:error})
    }
})
router.get("/getpost",userverification,async(req,res)=>{
    try {
        const posts=await Post.find();
       
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}) 
module.exports=router;