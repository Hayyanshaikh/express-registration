const Answer = require("../models/Answer");

exports.createAnswer = async (req, res) => {
  try {
    const answerData = req.body;

    const newAnswer = new Answer(answerData);

    await newAnswer.save();

    res.status(201).json({
      status: "success",
      data: newAnswer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate({
      path: "questionId",
      select: "question type",
    });

    res.status(200).json({
      status: "success",
      data: answers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneAnswer = async (req, res) => {
  try {
    const id = req.params.id;

    const answer = await Answer.findOne({ _id: id }).populate({
      path: "questionId",
      select: "question type",
    });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({
      status: "success",
      data: answer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const answerData = req.body;

    const answer = await Answer.findOneAndUpdate({ _id: id }, answerData, {
      new: true,
      runValidators: true,
    });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(201).json({
      status: "success",
      data: answer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const id = req.params.id;

    const answer = await Answer.findOneAndDelete({ _id: id });

    if (!answer) {
      return res.status(404).json({ message: "Answer not found" });
    }

    res.status(200).json({ message: "answer has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
