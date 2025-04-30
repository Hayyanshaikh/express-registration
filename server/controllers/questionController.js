const Question = require("../models/Question");
const Answer = require("../models/Answer");

exports.createQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    const newQuestion = new Question(questionData);

    await newQuestion.save();

    res.status(201).json({
      status: "success",
      data: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate({
      path: "quizId",
      select: "title",
    });

    res.status(200).json({
      status: "success",
      data: questions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await Question.findOne({ _id: id }).populate({
      path: "quizId",
      select: "title",
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      status: "success",
      data: question,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const questionData = req.body;

    const question = await Question.findOneAndUpdate(
      { _id: id },
      questionData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(201).json({
      status: "success",
      data: question,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const hasAnswer = await Answer.exists({ questionId: id });
    if (hasAnswer) {
      return res.status(400).json({
        status: "error",
        message:
          "Cannot delete this record because it is referenced in another module",
      });
    }

    const question = await Question.findOneAndDelete({ _id: id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "question has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
