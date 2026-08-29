const Collection = require("../models/Collection");

// ===============================
// Create Collection
// ===============================
exports.createCollection = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Collection name is required",
            });
        }

        const collection = await Collection.create({
            user: req.user.id,
            name,
            description,
            images: [],
        });

        res.status(201).json({
            message: "Collection created successfully",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create collection",
            error: error.message,
        });
    }
};

// ===============================
// Get All Collections of Logged-in User
// ===============================
exports.getUserCollections = async (req, res) => {
    try {
        const collections = await Collection.find({
            user: req.user.id,
        });

        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch collections",
            error: error.message,
        });
    }
};

// ===============================
// Get Single Collection
// ===============================
exports.getCollectionById = async (req, res) => {
    try {
        const collection = await Collection.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        res.status(200).json(collection);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch collection",
            error: error.message,
        });
    }
};

// ===============================
// Update Collection
// ===============================
exports.updateCollection = async (req, res) => {
    try {
        const { name, description } = req.body;

        const collection = await Collection.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        if (name) collection.name = name;
        if (description !== undefined) collection.description = description;

        await collection.save();

        res.status(200).json({
            message: "Collection updated successfully",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update collection",
            error: error.message,
        });
    }
};

// ===============================
// Delete Collection
// ===============================
exports.deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        res.status(200).json({
            message: "Collection deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete collection",
            error: error.message,
        });
    }
};

// ===============================
// Add Image to Collection
// ===============================
exports.addImageToCollection = async (req, res) => {
    try {
        const { nasaId, title, imageUrl } = req.body;

        const collection = await Collection.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        const alreadyExists = collection.images.some(
            (image) => image.nasaId === nasaId
        );

        if (alreadyExists) {
            return res.status(400).json({
                message: "Image already exists in this collection",
            });
        }

        collection.images.push({
            nasaId,
            title,
            imageUrl,
        });

        await collection.save();

        res.status(200).json({
            message: "Image added successfully",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add image",
            error: error.message,
        });
    }
};

// ===============================
// Remove Image from Collection
// ===============================
exports.removeImageFromCollection = async (req, res) => {
    try {
        const { nasaId } = req.params;

        const collection = await Collection.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!collection) {
            return res.status(404).json({
                message: "Collection not found",
            });
        }

        collection.images = collection.images.filter(
            (image) => image.nasaId !== nasaId
        );

        await collection.save();

        res.status(200).json({
            message: "Image removed successfully",
            collection,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to remove image",
            error: error.message,
        });
    }
};