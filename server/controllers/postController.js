const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const postData = req.body;

    const user = await User.findOne({ _id: postData.author });

    if (!user) {
      res.status(500).json({ message: "'Author' id is not valid" });
    }

    const newPost = new Post(postData);

    await newPost.save();

    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");

    res.status(200).json({
      status: "success",
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findOneAndDelete({ _id: id });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOnePost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await Post.findOne({ _id: id }).populate("author");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const postData = req.body;

    const post = await Post.findOneAndUpdate({ _id: id }, postData, {
      new: true,
      runValidators: true,
    }).populate("author");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
