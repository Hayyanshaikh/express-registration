const express = require("express");
const app = express();
const connectDB = require("../config/db");
const getAllRoutes = require("../all_routes/routes");

connectDB();

// Middleware
app.use(express.json());

// Routes
getAllRoutes(app);
// Global Error Handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something broke!" });
});

module.exports = app;
