const mongoose = require("mongoose");

const courseEnrollSchema = new mongoose.Schema(
  {
    userEmail: String,
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EnrollCourse = mongoose.model("EnrollCourse", courseEnrollSchema);

module.exports = EnrollCourse;