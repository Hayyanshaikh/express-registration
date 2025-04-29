const Quiz = require("../models/Quiz");

exports.createQuiz = async (req, res) => {
  try {
    const quizData = req.body;

    const newQuiz = new Quiz(quizData);

    await newQuiz.save();

    res.status(201).json({
      status: "success",
      data: newQuiz,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();

    res.status(200).json({
      status: "success",
      data: quizzes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    const quiz = await Quiz.findOneAndDelete({ _id: id });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneQuiz = async (req, res) => {
  try {
    const id = req.params.id;

    const quiz = await Quiz.findOne({ _id: id });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({
      status: "success",
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const id = req.params.id;
    const quizData = req.body;

    const quiz = await Quiz.findOneAndUpdate({ _id: id }, quizData, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(201).json({
      status: "success",
      data: quiz,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
