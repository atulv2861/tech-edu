const Course = require('../model/courseModel.js')
const EnrollCourse = require('../model/courseEnrollModel.js')
const mongoose = require('mongoose')
class CourseController{
    async getAllCourses(req,res){
        try {
            const {page =0} = req.query;
            const courses = await Course.aggregate([
              {
                $project: {
                  title: 1,
                  description: 1,
                  createdAt: 1,
                  images: { $arrayElemAt: ["$images", 0] } 
                }
              },
              { $sort: { _id: -1 } },
              { $skip: page * 4 },
              { $limit: 4 }
            ]);
            const count = await Course.countDocuments();

            res.status(200).json({
                success: true,
                message:"All courses",
                courses,
                totalCount:count
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    async getCourseById(req,res){
        try {
            const {id} = req.params;
            const course = await Course.findById(id,{title:1, description:1, createdAt:1 ,images:1});
            if(!course){
              return  res.status(404).json({
                    success:false,
                    message:"Course not found"
                })
            }
            res.status(200).json({
                success:true,
                message:"coures deatils",
                course
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    async createCourse(req,res){
        try {
            const courseData= req.body;
            await Course.create(courseData);
            res.status(201).json({
                success:true,
                message:"Course created",
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    async enrollCourse(req,res){
        try {
           const {courseId,userEmail} = req.body;
           await EnrollCourse.findOneAndUpdate({
            courseId,
            userEmail
           },
           {},
           {
            upsert:true
           });
           res.status(201).json({
               success:true,
               message:"Course enrolled"
           })
        } catch (error) {
           res.status(500).json({
               success:false,
               message:error.message
           })
        }
       }
    async getEnrolledCourse(req,res){
        try {
            const {email,page=0} = req.query;
            if(!email){
                return res.status(400).json({
                    success:false,
                    message:"Email is required"
                })
            }
            const pipleline=[
                [
                    {
                      $match: {
                        userEmail: email
                      }
                    },
                    {
                      $sort:
                        {
                          _id: -1
                        }
                    },
                    {
                      $skip:4*page
                    },
                    {
                      $limit:4
                    },
                    {
                      $lookup: {
                        from: "courses",
                        localField: "courseId",
                        foreignField: "_id",
                        as: "result"
                      }
                    },
                    {
                      $unwind: {
                        path: "$result",
                        preserveNullAndEmptyArrays: false
                      }
                    },
                    {
                      $project: {
                        title: "$result.title",
                        createdAt: "$result.createdAt",
                        description: "$result.description",
                        images:{ $arrayElemAt: ["$result.images", 0] },
                         _id: "$courseId"
                      }
                    }
                  ]
            ]
           
            const courses = await EnrollCourse.aggregate(pipleline)
            const count = await EnrollCourse.countDocuments({userEmail:email});
            res.status(200).json({
                success: true,
                message:"All enrolled courses",
                courses,
                totalCount:count
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    
    async getEnrolledCourseById(req,res){
        try{
            const {courseId,email} = req.query
            if(!email?.trim() || !courseId?.trim()){
                return res.status(400).json({
                    success:false,
                    message:"Please provide both email and course id"
                })
            }
            const pipleline= [
                {
                  $match: {
                    userEmail: email,
                    courseId: new mongoose.Types.ObjectId(courseId)
                  }
                },
                {
                  $lookup: {
                    from: "courses",
                    localField: "courseId",
                    foreignField: "_id",
                    as: "result"
                  }
                },
                {
                  $unwind: {
                    path: "$result",
                    preserveNullAndEmptyArrays: false
                  }
                },
                {
                  $project: {
                    title: "$result.title",
                    createdAt: "$result.createdAt",
                    description: "$result.description",
                    images: "$result.images",
                    _id: "$courseId"
                  }
                }
              ]
            const [course] = await EnrollCourse.aggregate(pipleline)
            res.status(200).json({
                success: true,
                message:"course details",
                course:course??null,
            })
        }catch(err){
            res.status(500).json({
                success:false,
                message:err.message
            })
        }

    }
}

module.exports = new CourseController();