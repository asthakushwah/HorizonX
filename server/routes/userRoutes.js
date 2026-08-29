const express = require("express");
const router = express.Router();

const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  uploadAvatar,
} = require("../controllers/userController");

// Multer configuration
const upload = multer({
  storage: multer.memoryStorage(),
});

// GET profile
router.get(
  "/profile",
  authMiddleware,
  getUserProfile
);

// UPDATE profile
router.put(
  "/profile",
  authMiddleware,
  updateUserProfile
);

// UPLOAD AVATAR
router.post(
  "/profile/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

// DELETE profile
router.delete(
  "/profile",
  authMiddleware,
  deleteUserProfile
);

module.exports = router;