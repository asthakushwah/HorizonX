const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;

    console.log("✅ MongoDB Connected:", conn.connection.host);
  } catch (error) {
    isConnected = false;

    console.error("❌ MongoDB Connection Failed:", error.message);

    throw error;
  }
};

module.exports = connectDB;