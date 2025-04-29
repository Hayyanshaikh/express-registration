const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController?.findAllCategories);
router.post("/", categoryController?.createCategory);
router.get("/:id", categoryController?.findOneCategory);
router.put("/:id", categoryController?.updateCategory);
router.delete("/:id", categoryController?.deleteCategory);

module.exports = router;
