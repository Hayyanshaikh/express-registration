const Course = require("../models/Course");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    const courseData = req.body;

    const user = await User.findOne({ _id: courseData.instructorId });

    if (!user) {
      res.status(500).json({ message: "'Instructor' id is not valid" });
    }

    const newCourse = new Course(courseData);

    await newCourse.save();

    res.status(201).json({
      status: "success",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({
        path: "instructorId",
        select: "name email role",
      })
      .populate({
        path: "categoryId",
        select: "name description",
      });

    res.status(200).json({
      status: "success",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const hasEnroll = await Enrollment.exists({ courseId: id });

    if (hasEnroll) {
      return res.status(400).json({
        message: "Course cannot be deleted because they have Enrollment",
      });
    }

    const course = await Course.findOneAndDelete({ _id: id });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneCourse = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await Course.findOne({ _id: id })
      .populate({
        path: "instructorId",
        select: "name email role",
      })
      .populate({
        path: "categoryId",
        select: "name description",
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({
      status: "success",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courseData = req.body;

    const course = await Course.findOneAndUpdate({ _id: id }, courseData, {
      new: true,
      runValidators: true,
    })
      .populate({
        path: "instructorId",
        select: "name email role",
      })
      .populate({
        path: "categoryId",
        select: "name description",
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(201).json({
      status: "success",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
