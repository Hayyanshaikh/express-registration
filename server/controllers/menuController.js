const Menu = require("../models/Menu"); // Import the Menu model
const mongoose = require("mongoose");

// Create a new menu item
exports.createMenu = async (req, res) => {
  try {
    const menuData = req.body;

    // Create new menu
    const newMenu = new Menu(menuData);

    // Save menu to database
    await newMenu.save();

    res.status(201).json({
      status: "success",
      data: newMenu,
      message: "Menu created successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error while creating menu.",
    });
  }
};

exports.getAllMenusWithPermissions = async (req, res) => {
  try {
    const menus = await Menu.find({}).populate({ path: "parentId" });

    if (!menus.length) {
      return res.status(404).json({
        status: "error",
        message: "No menus found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: menus,
      message: "All menus with permissions fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching all menus.",
    });
  }
};

// Get all menus accessible by a specific role
exports.getMenusByRole = async (req, res) => {
  try {
    const { role } = req.params;

    if (!["ADMIN", "INSTRUCTOR", "STUDENT"].includes(role)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid role specified.",
      });
    }

    // Find menus where the role is included in the permissions
    const menus = await Menu.find({ permissions: { $in: [role] } }).populate({
      path: "parentId",
    });

    if (!menus.length) {
      return res.status(404).json({
        status: "error",
        message: "No menus found for this role.",
      });
    }

    res.status(200).json({
      status: "success",
      data: menus,
      message: "Menus fetched successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error fetching menus.",
    });
  }
};

// Update an existing menu item
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { label, link, permissions, parentId } = req.body;

    // Find the menu item and update
    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { label, link, permissions, parentId },
      { new: true } // Return updated menu item
    );

    if (!updatedMenu) {
      return res.status(404).json({
        status: "error",
        message: "Menu not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedMenu,
      message: "Menu updated successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error updating menu.",
    });
  }
};

// Delete a menu item
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid menu ID.",
      });
    }

    // Delete the menu
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({
        status: "error",
        message: "Menu not found.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Menu deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: error?.message || "Internal server error.",
    });
  }
};
