const Submission = require("../models/Submission");

exports.createSubmission = async (req, res) => {
  try {
    const submissionData = req.body;

    const newSubmission = new Submission(submissionData);

    await newSubmission.save();

    res.status(201).json({
      status: "success",
      data: newSubmission,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate({
        path: "quizId",
      })
      .populate({
        path: "userId",
        select: "name email role",
      });

    res.status(200).json({
      status: "success",
      data: submissions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneSubmission = async (req, res) => {
  try {
    const id = req.params.id;

    const submission = await Submission.findOne({ _id: id })
      .populate({
        path: "quizId",
      })
      .populate({
        path: "userId",
        select: "name email role",
      });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(200).json({
      status: "success",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const id = req.params.id;
    const submissionData = req.body;

    const submission = await Submission.findOneAndUpdate(
      { _id: id },
      submissionData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res.status(201).json({
      status: "success",
      data: submission,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const id = req.params.id;

    // const hasQuiz = await Quiz.exists({ submissionId: id });
    // if (hasQuiz) {
    //   return res.status(400).json({
    //     status: "error",
    //     message:
    //       "Cannot delete this record because it is referenced in another module",
    //   });
    // }

    const submission = await Submission.findOneAndDelete({ _id: id });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    res
      .status(200)
      .json({ message: "submission has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
