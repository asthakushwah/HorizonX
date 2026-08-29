const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  googleCallback,
} = require("../controllers/authController");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// LOGOUT
router.post("/logout", logoutUser);

// GOOGLE LOGIN
router.get("/google", googleLogin);

// GOOGLE CALLBACK
router.get("/google/callback", googleCallback);

module.exports = router;
