const express = require("express");
const app = express();
const connectDB = require("../config/db");
const getAllRoutes = require("../all_routes/routes");
const cors = require("cors");

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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
