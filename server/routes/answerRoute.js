const express = require("express");
const router = express.Router();
const answerController = require("../controllers/answerController");

router.get("/", answerController?.findAllAnswers);
router.post("/", answerController?.createAnswer);
router.get("/:id", answerController?.findOneAnswer);
router.put("/:id", answerController?.updateAnswer);
router.delete("/:id", answerController?.deleteAnswer);

module.exports = router;
