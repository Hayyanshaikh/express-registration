const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
    required: [true, "Please select a role."],
  },
  verifiedInstructor: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set("toJSON", {
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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
