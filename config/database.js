require('dotenv').config();// dotenvを追加
const mongoose = require('mongoose');// mongooseを追加

const connectDB = async () => {
  try {
	// MongoDBに接続
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); //  サーバーを停止
  }
};

module.exports = connectDB;
