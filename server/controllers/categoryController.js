const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  try {
    const categoryData = req.body;

    const newCategory = new Category(categoryData);

    await newCategory.save();

    res.status(201).json({
      status: "success",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const courseCount = await Course.countDocuments({ categoryId: id });

    if (courseCount > 0) {
      return res.status(400).json({
        message: "Category cannot be deleted because they have courses",
      });
    }

    const category = await Category.findOneAndDelete({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category has been delete successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.findOneCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const categoryData = req.body;

    const category = await Category.findOneAndUpdate(
      { _id: id },
      categoryData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
