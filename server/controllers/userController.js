const User = require("../models/User");
const Favorite = require("../models/Favorite");
const Collection = require("../models/Collection");
const Chat = require("../models/Chat");

const cloudinary = require("../config/cloudinary");

// ===============================
// GET USER PROFILE
// ===============================
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Get Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ===============================
// UPDATE USER PROFILE
// ===============================
exports.updateUserProfile = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name;
    user.email = email;

    await user.save();

    const updatedUser = await User.findById(req.user.id)
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ===============================
// UPLOAD AVATAR
// ===============================
exports.uploadAvatar = async (req, res) => {
  try {

    // Check whether image was uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "horizonx/avatars",
          resource_type: "image",
        },

        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    // Save Cloudinary URL in MongoDB
    user.avatar = result.secure_url;

    await user.save();

    // Return updated user
    const updatedUser = await User.findById(req.user.id)
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Avatar uploaded successfully",
      user: updatedUser,
      avatar: user.avatar,
    });

  } catch (error) {
    console.error("Avatar Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload avatar",
    });
  }
};


// ===============================
// DELETE USER PROFILE
// ===============================
exports.deleteUserProfile = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Delete all user's related data
    await Favorite.deleteMany({
      user: req.user.id,
    });

    await Collection.deleteMany({
      user: req.user.id,
    });

    await Chat.deleteMany({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete Profile Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};