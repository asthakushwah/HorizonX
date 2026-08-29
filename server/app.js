const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const nasaRoutes = require("./routes/nasaRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NASA Gallery API is running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/nasa", nasaRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/users", userRoutes);


module.exports = app;