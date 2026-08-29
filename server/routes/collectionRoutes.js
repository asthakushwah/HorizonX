const express = require("express");
const router = express.Router();

const {
    createCollection,
    getUserCollections,
    getCollectionById,
    updateCollection,
    deleteCollection,
    addImageToCollection,
    removeImageFromCollection,
} = require("../controllers/collectionController");

const authMiddleware = require("../middleware/authMiddleware");

// Collections
router.post("/", authMiddleware, createCollection);

router.get("/", authMiddleware, getUserCollections);

router.get("/:id", authMiddleware, getCollectionById);

router.put("/:id", authMiddleware, updateCollection);

router.delete("/:id", authMiddleware, deleteCollection);

// Images inside collection
router.post("/:id/images", authMiddleware, addImageToCollection);

router.delete("/:id/images/:nasaId", authMiddleware, removeImageFromCollection);

module.exports = router;