const express = require("express");
const menuController = require("../controllers/menuController");
const router = express.Router();

router.get("/", menuController.getAllMenusWithPermissions);

// Route to create a new menu
router.post("/", menuController.createMenu);

// Route to get menus based on user role (ADMIN, INSTRUCTOR, STUDENT)
router.get("/:role", menuController.getMenusByRole);

// Route to update an existing menu
router.put("/:id", menuController.updateMenu);

// Route to delete a menu
router.delete("/:id", menuController.deleteMenu);

module.exports = router;
