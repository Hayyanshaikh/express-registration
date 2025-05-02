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
      data: user,
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
    const { email, password, role } = req.body;

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Username, password, and role are required",
      });
    }

    const user = await User.findOne({ email, role });

    // Check password
    if (!user || !(await user.matchPassword(password)) || role) {
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
