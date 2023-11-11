const mongoose = require("mongoose");
const CourseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    // publishedDate: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  {
    timestamps: true,
  }
);

const CourseModel = mongoose.model("newcourses", CourseSchema);

module.exports = CourseModel;
