const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const userController = require("../controller/userController");

// Users related routes
router.get("/getAllUsers", userController.getAllUsers);

// Auth related routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotpassword);
router.post("/resetPassword", authController.resetpassword);

module.exports = router;
