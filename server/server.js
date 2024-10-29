const app = require('./app')
const dbConnection = require('./connection/dbConnection')





dbConnection();

const PORT = process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`Server is up on PORT : ${PORT}`)
})