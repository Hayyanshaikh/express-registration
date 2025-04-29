const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController?.findAllCourses);
router.post("/", courseController?.createCourse);
router.get("/:id", courseController?.findOneCourse);
router.put("/:id", courseController?.updateCourse);
router.delete("/:id", courseController?.deleteCourse);

module.exports = router;
