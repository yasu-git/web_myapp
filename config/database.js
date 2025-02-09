require('dotenv').config(); // .env ファイルの環境変数を読み込む
const mongoose = require('mongoose'); // Mongoose をインポート（MongoDB との接続用）

/**
 * MongoDB への接続を確立する関数
 * - 環境変数 MONGODB_URI を使用してデータベースに接続
 * - 接続成功時/失敗時にコンソールにログを出力
 */
const connectDB = async () => {
	try {
		// 環境変数から MongoDB の接続 URI を取得し、データベースに接続
		await mongoose.connect(process.env.MONGODB_URI);
		console.log("MongoDB connected successfully"); // 接続成功時のログ
	} catch (error) {
		console.error("MongoDB connection error:", error); // エラー発生時のログ
		process.exit(1); // 致命的なエラーのため、プロセスを終了
	}
};

// 関数をエクスポートし、他のファイルから `connectDB()` を実行できるようにする
module.exports = connectDB;
