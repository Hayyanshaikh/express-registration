const authRoutes = require("../routes/authRoute");
const userRoutes = require("../routes/userRoute");
const courseRoutes = require("../routes/courseRoute");
const categoryRoutes = require("../routes/categoryRoute");
const enrollmentRoutes = require("../routes/enrollmentRoute");
const lessonRoutes = require("../routes/lessonRoute");
const quizRoutes = require("../routes/quizRoute");
const questionRoutes = require("../routes/questionRoute");
const answerRoutes = require("../routes/answerRoute");
const submissionRoutes = require("../routes/submissionRoute");
const subAnswerRoutes = require("../routes/subAnswerRoute");
const menuRoutes = require("../routes/menuRoute");
const fileRoutes = require("../routes/fileRoute");

const getAllRoutes = (app) => {
  app.use("/api", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/courses", courseRoutes);
  app.use("/api/categories", categoryRoutes);
  app.use("/api/enrollments", enrollmentRoutes);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/quizzes", quizRoutes);
  app.use("/api/questions", questionRoutes);
  app.use("/api/answers", answerRoutes);
  app.use("/api/submissions", submissionRoutes);
  app.use("/api/submission-answers", subAnswerRoutes);
  app.use("/api/menus", menuRoutes);
  app.use("/api", fileRoutes);
};

module.exports = getAllRoutes;
