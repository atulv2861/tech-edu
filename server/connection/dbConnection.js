
const mongoose = require('mongoose')
const dbConnection = async()=>{
    try{
        const URL = process.env.DB_URL
        
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("database connected")

    }catch(err){        
        console.log("Error in db connection : "+err.message)
    }
}

module.exports = dbConnection