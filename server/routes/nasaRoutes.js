const express = require("express");
const router = express.Router();

const {
    getAPOD,
    getAPODByDate,
    searchImages,
    getImageDetails,
    getMarsPhotos,
    getEarthImage,
    getEpicImages,
    getAsteroids,
    getRandomImage,
    getTrendingImages,
    getCategories,
} = require("../controllers/nasaController");

// APOD
router.get("/apod", getAPOD);
router.get("/apod/:date", getAPODByDate);

// NASA Images
router.get("/search", searchImages);
router.get("/image/:nasaId", getImageDetails);

// Mars Rover
router.get("/mars", getMarsPhotos);

// Earth Imagery
router.get("/earth", getEarthImage);

// EPIC
router.get("/epic", getEpicImages);

// Asteroids
router.get("/asteroids", getAsteroids);

// Random APOD
router.get("/random", getRandomImage);

// Trending Images
router.get("/trending", getTrendingImages);

// Categories
router.get("/categories", getCategories);

module.exports = router;