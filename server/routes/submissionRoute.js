const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");

router.get("/", submissionController?.findAllSubmissions);
router.post("/", submissionController?.createSubmission);
router.get("/:id", submissionController?.findOneSubmission);
router.put("/:id", submissionController?.updateSubmission);
router.delete("/:id", submissionController?.deleteSubmission);

module.exports = router;
