const Lesson = require("../models/Lesson");

exports.createLesson = async (req, res) => {
  try {
    const lessonData = req.body;

    const newLesson = new Lesson(lessonData);

    await newLesson.save();

    res.status(201).json({
      status: "success",
      data: newLesson,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate({
      path: "courseId",
      select: "title description",
    });

    res.status(200).json({
      status: "success",
      data: lessons,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneLesson = async (req, res) => {
  try {
    const id = req.params.id;

    const lesson = await Lesson.findOne({ _id: id }).populate({
      path: "courseId",
      select: "title description",
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const id = req.params.id;
    const lessonData = req.body;

    const lesson = await Lesson.findOneAndUpdate({ _id: id }, lessonData, {
      new: true,
      runValidators: true,
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(201).json({
      status: "success",
      data: lesson,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const id = req.params.id;

    const hasQuiz = await Quiz.exists({ lessonId: id });
    if (hasQuiz) {
      return res.status(400).json({
        status: "error",
        message:
          "Cannot delete this record because it is referenced in another module",
      });
    }

    const lesson = await Lesson.findOneAndDelete({ _id: id });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json({ message: "lesson has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
