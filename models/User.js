const mongoose = require('mongoose'); // Mongooseをインポート（MongoDBとの接続を容易にするライブラリ）
const { v4: uuidv4 } = require('uuid'); // uuidをインポートし、v4（ランダムなUUID）を使用

// ユーザー情報を管理するためのスキーマ（データ構造の定義）
const userSchema = new mongoose.Schema({
	_id: {
		type: String, // MongoDBのデフォルトのObjectIdではなく、UUIDを使用
		default: uuidv4 // デフォルトでUUIDを生成して設定
	},
	name: {
		type: String, // ユーザー名（文字列）
		required: true // 必須項目
	},
	email: {
		type: String, // メールアドレス（文字列）
		unique: true, // 重複を許可しない（ユニーク制約）
		required: true // 必須項目
	},
	tel: {
		type: String, // 電話番号（文字列）
		required: true // 必須項目
	}
}, {
	timestamps: true // `createdAt` と `updatedAt` を自動的に管理
});

// `User` モデルをエクスポート（他のファイルで使用可能）
module.exports = mongoose.model('User', userSchema);
