const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (error) {
    isConnected = false;
    console.error("❌ MongoDB Connection Failed:", error.message);
    throw error;
  }
};

module.exports = connectDB;