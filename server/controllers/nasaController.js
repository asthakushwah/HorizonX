const axios = require("axios");

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = "https://api.nasa.gov";

// ===============================
// Get Astronomy Picture of the Day
// ===============================
exports.getAPOD = async (req, res) => {
    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch APOD",
            error: error.message,
        });
    }
};

// ===============================
// Get APOD by Date
// ===============================
exports.getAPODByDate = async (req, res) => {
    const { date } = req.params;
if(!date) {
    return res.status(400).json({
        message: "Date parameter is required",
    });
}
    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch APOD",
        });
    }
};

// ===============================
// Search NASA Images
// ===============================
exports.searchImages = async (req, res) => {
    const { q } = req.query;
    if (!q) {
    return res.status(400).json({
        message: "Search query is required",
    });
}

    try {
        const response = await axios.get(
            `https://images-api.nasa.gov/search?q=${q}&media_type=image`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Image search failed",
            error: error.message,
        });
    }
};

// ===============================
// Get Image Details
// ===============================
exports.getImageDetails = async (req, res) => {
    const { nasaId } = req.params;

    try {
        const response = await axios.get(
            `https://images-api.nasa.gov/search?nasa_id=${nasaId}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch image",
        });
    }
};

// ===============================
// Mars Rover Photos
// ===============================
exports.getMarsPhotos = async (req, res) => {
    const rover = req.query.rover || "curiosity";
    const sol = req.query.sol || 1000;

    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Mars API Error:");
    console.error(error.response?.status);
    console.error(error.response?.data);
    console.error(error.message);

    res.status(500).json({
        message: "Unable to fetch Mars photos",
        error: error.message,
        });
    }
};

// ===============================
// Earth Imagery
// ===============================
exports.getEarthImage = async (req, res) => {
    const { lat, lon, date } = req.query;
    if(!lat || !lon || !date) {
        return res.status(400).json({
            message: "Latitude, Longitude, and Date parameters are required",
        });
    }

    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/planetary/earth/assets?lat=${lat}&lon=${lon}&date=${date}&api_key=${NASA_API_KEY}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch Earth imagery",
        });
    }
};

// ===============================
// EPIC Images
// ===============================
exports.getEpicImages = async (req, res) => {
    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/EPIC/api/natural/images?api_key=${NASA_API_KEY}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch EPIC images",
        });
    }
};

// ===============================
// Asteroids
// ===============================
exports.getAsteroids = async (req, res) => {
    const { start_date, end_date } = req.query;

    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${NASA_API_KEY}`
        );

        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch asteroid data",
        });
    }
};

// ===============================
// Random APOD
// ===============================
exports.getRandomImage = async (req, res) => {
    try {
        const response = await axios.get(
            `${NASA_BASE_URL}/planetary/apod?count=1&api_key=${NASA_API_KEY}`
        );

        res.status(200).json(response.data[0]);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch random image",
        });
    }
};

// ===============================
// Trending Images (Placeholder)
// ===============================
exports.getTrendingImages = async (req, res) => {
    try {
        // Later this can query your MongoDB
        res.status(200).json({
            message: "Trending images feature coming soon",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

// ===============================
// Categories (Static)
// ===============================
exports.getCategories = async (req, res) => {
    try {
        res.status(200).json({
            categories: [
                "Mars",
                "Moon",
                "Earth",
                "Galaxy",
                "Nebula",
                "Black Hole",
                "ISS",
            ],
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};