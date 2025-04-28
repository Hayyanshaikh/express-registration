const authRoutes = require("../routes/authRoute");
const userRoutes = require("../routes/userRoute");

const getAllRoutes = (app) => {
  app.use("/api", authRoutes);
  app.use("/api/users", userRoutes);
};

module.exports = getAllRoutes;
