const express = require("express");
const userController = require("../controllers/userControllers");
//! Router
const router = express.Router();

//! Public Routes

router.post("/register", userController.Register);

//! Private Routes
router.post("/login", userController.Login);

module.exports = router;
