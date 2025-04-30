const SubAnswer = require("../models/SubAnswer");

exports.createSubAnswer = async (req, res) => {
  try {
    const subAnswerData = req.body;

    const newSubAnswer = new SubAnswer(subAnswerData);

    await newSubAnswer.save();

    res.status(201).json({
      status: "success",
      data: newSubAnswer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllSubAnswers = async (req, res) => {
  try {
    const subAnswers = await SubAnswer.find()
      .populate({
        path: "submissionId",
      })
      .populate({
        path: "questionId",
      })
      .populate({
        path: "selectedAnswerId",
      });

    res.status(200).json({
      status: "success",
      data: subAnswers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneSubAnswer = async (req, res) => {
  try {
    const id = req.params.id;

    const subAnswer = await SubAnswer.findOne({ _id: id })
      .populate({
        path: "submissionId",
      })
      .populate({
        path: "questionId",
      })
      .populate({
        path: "selectedAnswerId",
      });

    if (!subAnswer) {
      return res.status(404).json({ message: "SubAnswer not found" });
    }

    res.status(200).json({
      status: "success",
      data: subAnswer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateSubAnswer = async (req, res) => {
  try {
    const id = req.params.id;
    const subAnswerData = req.body;

    const subAnswer = await SubAnswer.findOneAndUpdate(
      { _id: id },
      subAnswerData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subAnswer) {
      return res.status(404).json({ message: "SubAnswer not found" });
    }

    res.status(201).json({
      status: "success",
      data: subAnswer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteSubAnswer = async (req, res) => {
  try {
    const id = req.params.id;

    const subAnswer = await SubAnswer.findOneAndDelete({ _id: id });

    if (!subAnswer) {
      return res.status(404).json({ message: "SubAnswer not found" });
    }

    res.status(200).json({ message: "subAnswer has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
