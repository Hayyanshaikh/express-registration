const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

router.get("/", lessonController?.findAllLessons);
router.post("/", lessonController?.createLesson);
router.get("/:id", lessonController?.findOneLesson);
router.put("/:id", lessonController?.updateLesson);
router.delete("/:id", lessonController?.deleteLesson);

module.exports = router;
