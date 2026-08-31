const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", logoutUser);


module.exports = router;
