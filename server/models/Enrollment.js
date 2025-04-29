const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  status: {
    type: String,
    enum: ["ENROLLED", "COMPLETED", "DROPPED"],
    default: "ENROLLED",
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

enrollmentSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    if (ret.userId) {
      ret.user = ret.userId;
      delete ret.userId;
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

module.exports = mongoose.model("Enrollment", enrollmentSchema);
