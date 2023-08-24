const jwt=require('jsonwebtoken');
const hash="Tasktwo";
const userverification=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        return res.status(500).send({error:"Token is missing"})
    }
    const verification=jwt.verify(token,hash,(error,user)=>{
        if(error){
            return res.status(400).send({error:error})
        }
        req.user=user;
        console.log(token);
        
        next();
    });

} 
module.exports=userverification;