const mongoose = require("mongoose");

const subAnswerSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selectedAnswerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

subAnswerSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    if (ret.selectedAnswerId) {
      ret.selectedAnswer = ret.selectedAnswerId;
      delete ret.selectedAnswerId;
    }
    if (ret.questionId) {
      ret.question = ret.questionId;
      delete ret.questionId;
    }
    if (ret.submissionId) {
      ret.submission = ret.submissionId;
      delete ret.submissionId;
    }
    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("SubAnswer", subAnswerSchema);
