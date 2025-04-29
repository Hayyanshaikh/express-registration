const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(201).json({
      status: "success find all users",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.findOneUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({ _id: id });

    if (!user) {
      res.status(500).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "successfully find user",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "Update successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const hasCourse = await Course.exists({ instructorId: id });
    const hasEnroll = await Enrollment.exists({ userId: id });

    if (hasCourse || hasEnroll) {
      return res
        .status(400)
        .json({ message: "User cannot be deleted because they have courses" });
    }

    const user = await User.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "user has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
