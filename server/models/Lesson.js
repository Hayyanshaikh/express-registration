const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  contentUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

lessonSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    if (ret.courseId) {
      ret.course = ret.courseId;
      delete ret.courseId;
    }
    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
