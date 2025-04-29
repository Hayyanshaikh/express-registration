const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.set("toJSON", {
  virtuals: true,
  transform: function (_, ret) {
    if (ret._id) {
      ret.id = ret._id;
      delete ret._id;
    }

    // Optionally remove __v
    delete ret.__v;

    return ret;
  },
});

module.exports = mongoose.model("Category", categorySchema);
