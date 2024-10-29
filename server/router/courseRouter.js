const router = require('express').Router();
const courseController = require('../controller/courseController')
const reqValidation = require('../middleware/reqValidation')
const courseValidation = require("../utils/validationSchema")
router.route("/createCourse").post(reqValidation.validate(courseValidation.createCourse),courseController.createCourse)
router.route("/getAllCourses").get(courseController.getAllCourses)
router.route("/getCourseById/:id").get(courseController.getCourseById)
router.route("/enrollCourse").post(reqValidation.validate(courseValidation.enrollCourse),courseController.enrollCourse);
router.route("/getEnrollCourses").get(courseController.getEnrolledCourse);
router.route("/getEnrolledCourseById").get(courseController.getEnrolledCourseById);


module.exports = router
