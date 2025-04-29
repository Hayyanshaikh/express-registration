const authRoutes = require("../routes/authRoute");
const userRoutes = require("../routes/userRoute");
const postRoutes = require("../routes/postRoute");

const getAllRoutes = (app) => {
  app.use("/api", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);
};

module.exports = getAllRoutes;
