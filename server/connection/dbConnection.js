
const mongoose = require('mongoose')
const dbConnection = async()=>{
    try{
        //const URL = process.env.DB_URL
        const URL='mongodb+srv://Admin:5xwHUzrYEE0w4Q8l@cluster0.qdjik.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("database connected")

    }catch(err){
        console.log(err)
        console.log("Error in db connection : "+err.message)
    }
}

module.exports = dbConnection