const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

questionSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    if (ret.quizId) {
      ret.course = ret.quizId;
      delete ret.quizId;
    }
    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Question", questionSchema);
