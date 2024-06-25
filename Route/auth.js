const express=require('express')
const User=require("../Model/User");
const router=express.Router();
const {body,validationResult}=require('express-validator')
const {jwt1}=require('../keys')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const userverification = require('../Middleware/verifyuser');
const hash="Tasktwo";
router.post('/createUser',[
    body("name","User name must be unique").isLength({min:3}),
    body("email","Enter a Valid email").isEmail(),
    body("password","Password must contain atleast 5 characters").isLength({min:5}),
],async(req,res)=>{
    const error=validationResult(req);
    let success=false;
    if(!error){
        return res.status(400).json({success,error:error.array()});
    }
    try {
        let username=await User.findOne({name:req.body.name})
        if(username){
            return res.status(400).json({success,error:"User with this name already exists"});
        }
        let user=await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({success,error:"User with this email already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const secpass=await bcrypt.hash(req.body.password,salt);
        success=true;
        user=await User.create({
            name:req.body.name,
            email:req.body.email, 
            password:secpass
        })
        const data={
            user:{
                id:user.id
            }
        }
        const auth=jwt.sign(data,hash);
        res.status(200).json({success,auth});
    } catch(error) {
        console.log(error.message);
        return res.status(500).send("Some error occured");
    }
})
router.get('/getuser',userverification,async(req,res)=>{
    const {id}=req.user.user;
    const user=await User.findOne({_id:id});
    if(!user){
        return res.send("User not found")
    }
    console.log(user.name);
    res.status(200).json(user.name);
})
router.post('/login/',[
    body("email","Enter a Valid email").isEmail(),
    body("password","Password must contain atleast 5 characters").isLength({min:5}),
],async(req,res)=>{
    const error=validationResult(req);

    let success=false;
    if(!error){
        return res.status(400).json({success,error:error.array()});
    }
    try {
        let user=await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).json({success,error:"Please enter a registered email"});
        }
        const salt=await bcrypt.genSalt(10);
        const compare=await bcrypt.compare(req.body.password,user.password);
        if(!compare){
            return res.status(400).json({success,error:"Invalid password"});
        }
        const data={
            user:{
                id:user.id
            }
        }
        success=true;
        const auth=jwt.sign(data,hash);
        const name=user.name;
        res.status(200).send({success,auth,name});
    } catch(error) {
        console.log(error.message);
        return res.status(500).send("Some error occured");
    }
})
module.exports = router