const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadFile, getFile } = require("../controllers/fileController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files/:id", getFile);

module.exports = router;
