const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.get("/", postController?.findAllPosts);
router.post("/", postController?.createPost);
router.get("/:id", postController?.findOnePost);
router.put("/:id", postController?.updatePost);
router.delete("/:id", postController?.deletePost);

module.exports = router;
