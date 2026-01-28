const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed ❌");
    console.error("Error details:", error.message);
    if (error.name === 'MongoServerError' && error.code === 8000) {
      console.error("Authentication failed - check username/password in .env");
    }
    process.exit(1);
  }
};

module.exports = connectDB;
