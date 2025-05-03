const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    default: null,
  },
  permissions: {
    type: [String],
    enum: ["ADMIN", "INSTRUCTOR", "STUDENT"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Clean up JSON output by removing unnecessary fields
MenuSchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }
    if (ret.parentId) {
      ret.parent = ret.parentId;
      delete ret.parentId;
    }

    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Menu", MenuSchema);
