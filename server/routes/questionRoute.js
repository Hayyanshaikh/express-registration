const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

router.get("/", questionController?.findAllQuestions);
router.post("/", questionController?.createQuestion);
router.get("/:id", questionController?.findOneQuestion);
router.put("/:id", questionController?.updateQuestion);
router.delete("/:id", questionController?.deleteQuestion);

module.exports = router;
