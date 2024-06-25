const express=require('express');
const app=express();
const cors=require('cors');
const mongooseconnect = require('./db');
app.use(cors());
const path = require('path')

require('dotenv').config()
const port=process.env.Port
mongooseconnect();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.join(__dirname , "./client/build")))

app.get('/',(req,res)=>{
    res.send("All good")
})
app.use('/api/auth',require('./Route/auth'));
app.use('/api/post',require('./Route/post-controller'));

app.get("*"  ,(req,res)=> {
    res.sendFile(
        path.join(__dirname , "./client/build/index.html"),

        function(err){ 
            res.status(500).send(err)
        }
    )
})
app.listen(port,()=>{
    console.log("Listening at port 5000")
})