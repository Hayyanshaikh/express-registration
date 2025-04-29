const mongoose = require("mongoose");

const uploadedFileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  mimetype: String,
  size: Number,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

uploadedFileSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("UploadedFile", uploadedFileSchema);
