const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const roleController = require("../controllers/roleController");

// Routes for users
router.get("users/", userController.getUsers);
router.get("users/:id", userController.getUser);
router.post("users/", userController.createUser);
router.put("users/:id", userController.updateUser);
router.delete("users/:id", userController.deleteUser);

// Routes for roles
router.post("/roles", roleController.createRole);
router.get("/roles", roleController.getRoles);
router.get("/roles/:id", roleController.getRole);
router.put("/roles/:id", roleController.updateRole);
router.delete("/roles/:id", roleController.deleteRole);
module.exports = router;
