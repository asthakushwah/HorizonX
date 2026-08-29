const express = require("express");
const router = express.Router();

const {
    addFavorite,
    getFavorites,
    getFavoriteById,
    removeFavorite,
    checkFavorite,
} = require("../controllers/favoriteController");

const authMiddleware = require("../middleware/authMiddleware");

// Favorites
router.post("/", authMiddleware, addFavorite);

router.get("/", authMiddleware, getFavorites);

router.get("/:id", authMiddleware, getFavoriteById);

router.get("/check/:imageId", authMiddleware, checkFavorite);

router.delete("/:id", authMiddleware, removeFavorite);



module.exports = router;