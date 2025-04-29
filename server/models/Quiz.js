const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

quizSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    if (ret.lessonId) {
      ret.course = ret.lessonId;
      delete ret.lessonId;
    }
    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
