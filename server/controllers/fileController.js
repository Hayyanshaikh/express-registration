const UploadedFile = require("../models/UploadedFile");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const saved = new UploadedFile({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    });

    await saved.save();

    res.status(200).json({
      message: "File uploaded and saved in DB",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFile = async (req, res) => {
  try {
    const file = await UploadedFile.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    res.status(200).json({
      message: "File retrieved successfully",
      data: file,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
