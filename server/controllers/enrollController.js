const Enrollment = require("../models/Enrollment");

exports.createEnrollment = async (req, res) => {
  try {
    const enrollmentData = req.body;

    const newEnrollment = new Enrollment(enrollmentData);

    await newEnrollment.save();

    res.status(201).json({
      status: "success",
      data: newEnrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate({
        path: "userId",
        select: "name email role",
      })
      .populate({
        path: "courseId",
        select: "title description",
      });

    res.status(200).json({
      status: "success",
      data: enrollments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneEnrollment = async (req, res) => {
  try {
    const id = req.params.id;

    const enrollment = await Enrollment.findOne({ _id: id })
      .populate({
        path: "userId",
        select: "name email role",
      })
      .populate({
        path: "courseId",
        select: "title description",
      });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({
      status: "success",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateEnrollment = async (req, res) => {
  try {
    const id = req.params.id;
    const enrollmentData = req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { _id: id },
      enrollmentData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(201).json({
      status: "success",
      data: enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
