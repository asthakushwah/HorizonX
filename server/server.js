const dotenv = require("dotenv");
dotenv.config(); 
const connectDB = require("./config/db");
const app = require("./app");

// Connect MongoDB
connectDB();
console.log(process.env.GEMINI_API_KEY);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});