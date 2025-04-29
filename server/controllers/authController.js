const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Token generator function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.signup = async (req, res) => {
  try {
    const userData = req.body;

    const user = await User.create(userData);
    // Generate Token
    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    // Check password
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
