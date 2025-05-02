const User = require("../models/User");
const jwt = require("jsonwebtoken");
const handleDuplicateError = require("../utils/errorHandlers/duplicateError");
const handleValidationError = require("../utils/errorHandlers/validationError");

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

    res.status(201).json({
      status: "success",
      data: user,
      message: "Signup successful.",
    });
  } catch (error) {
    const duplicate = handleDuplicateError(error, "Email");
    const validate = handleValidationError(error);

    const errorResponse = duplicate || validate;

    if (errorResponse) {
      return res
        .status(400)
        .json({ status: "error", message: errorResponse.message });
    }

    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Username, password, and role are required",
      });
    }

    const user = await User.findOne({ email, role });

    // Check password
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({
      status: "success",
      message: "Login Successfully",
      token,
      data: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    req.user = user;
    next();
  });
};
