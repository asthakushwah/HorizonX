const Favorite = require("../models/Favorite");

// ===============================
// Add to Favorites
// ===============================
exports.addFavorite = async (req, res) => {
    try {
        const { imageId, title, imageUrl } = req.body;

        if (!imageId || !title || !imageUrl) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingFavorite = await Favorite.findOne({
            user: req.user.id,
            imageId,
        });

        if (existingFavorite) {
            return res.status(400).json({
                message: "Image already exists in favorites",
            });
        }

        const favorite = await Favorite.create({
            user: req.user.id,
            imageId,
            title,
            imageUrl,
        });

        res.status(201).json({
            message: "Image added to favorites",
            favorite,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add favorite",
            error: error.message,
        });
    }
};

// ===============================
// Get All Favorites
// ===============================
exports.getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find({
            user: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json(favorites);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch favorites",
            error: error.message,
        });
    }
};

// ===============================
// Get Favorite By ID
// ===============================
exports.getFavoriteById = async (req, res) => {
    try {
        const favorite = await Favorite.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!favorite) {
            return res.status(404).json({
                message: "Favorite not found",
            });
        }

        res.status(200).json(favorite);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch favorite",
            error: error.message,
        });
    }
};

// ===============================
// Remove Favorite
// ===============================
exports.removeFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!favorite) {
            return res.status(404).json({
                message: "Favorite not found",
            });
        }

        res.status(200).json({
            message: "Favorite removed successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to remove favorite",
            error: error.message,
        });
    }
};

// ===============================
// Check Favorite Status
// ===============================
exports.checkFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.findOne({
            user: req.user.id,
            imageId: req.params.imageId,
        });

        res.status(200).json({
            isFavorite: !!favorite,
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to check favorite status",
            error: error.message,
        });
    }
};