
const mongoose = require("mongoose")
const courseSchema = mongoose.Schema({
    title: String,
    description: String,
    images:Array,
    createdBy:String
},{
    timestamps:true
})
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;