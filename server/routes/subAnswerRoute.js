const express = require("express");
const router = express.Router();
const subAnswerController = require("../controllers/subAnswerController");

router.get("/", subAnswerController?.findAllSubAnswers);
router.post("/", subAnswerController?.createSubAnswer);
router.get("/:id", subAnswerController?.findOneSubAnswer);
router.put("/:id", subAnswerController?.updateSubAnswer);
router.delete("/:id", subAnswerController?.deleteSubAnswer);

module.exports = router;
