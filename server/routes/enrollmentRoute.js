const express = require("express");
const router = express.Router();
const enrollController = require("../controllers/enrollController");

router.get("/", enrollController?.findAllEnrollments);
router.post("/", enrollController?.createEnrollment);
router.get("/:id", enrollController?.findOneEnrollment);
router.put("/:id", enrollController?.updateEnrollment);

module.exports = router;
