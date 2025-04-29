const authRoutes = require("../routes/authRoute");
const userRoutes = require("../routes/userRoute");
const courseRoutes = require("../routes/courseRoute");
const categoryRoutes = require("../routes/categoryRoute");
const enrollmentRoutes = require("../routes/enrollmentRoute");

const getAllRoutes = (app) => {
  app.use("/api", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/enrollments", enrollmentRoutes);
};

module.exports = getAllRoutes;
