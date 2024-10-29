const express = require('express')
const app = express();
const path = require('path')
const cors = require('cors')
require('dotenv').config({ path: './config/config.env' });
const courseRouter = require('./router/courseRouter')

app.use(express.json({ extended: true, limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*',
}))
app.use("/course",courseRouter)

app.get("/test",(req,res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"test route is working"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})
//initalized frontend
app.use(express.static(path.join(__dirname,'../client/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'.../client/build/index.html'))
})

module.exports = app;
