const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

courseSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    // Rename instructorId → instructor
    if (ret.instructorId) {
      ret.instructor = ret.instructorId;
      delete ret.instructorId;
    }

    // Rename categoryId → category
    if (ret.categoryId) {
      ret.category = ret.categoryId;
      delete ret.categoryId;
    }

    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Course", courseSchema);
