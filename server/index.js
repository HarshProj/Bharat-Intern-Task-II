const express=require('express');
const app=express();
const cors=require('cors');
const mongooseconnect = require('./db');
app.use(cors());
mongooseconnect();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.get('/',(req,res)=>{
    res.send("All good")
})
app.use('/api/auth',require('./Route/auth'));
app.use('/api/post',require('./Route/post-controller'));

app.listen(5000,()=>{
    console.log("Listening at port 5000")
})