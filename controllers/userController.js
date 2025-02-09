const User = require("../models/User"); // ユーザーモデルをインポート

/**
 * 共通のエラーハンドリング関数
 * - すべてのエラーレスポンスを統一的に処理するための関数
 * - エラーメッセージと詳細なエラー情報をログに出力
 */
const handleErrorResponse = (res, error, message) => {
	console.error(message, error); // サーバー側のログにエラーを出力
	res.status(500).json({ message }); // クライアントにエラーメッセージを返す
};

/**
 * すべてのユーザーを取得
 * - MongoDB からすべてのユーザーデータを取得する
 */
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find(); // ユーザーコレクションから全件取得
		res.status(200).json(users); // 成功時に200ステータスでユーザーリストを返す
	} catch (error) {
		handleErrorResponse(res, error, "ユーザー取得に失敗しました");
	}
};

/**
 * 特定のユーザーを取得
 * - クエリパラメータの `id` をもとに、ユーザー情報を取得
 */
exports.getUserById = async (req, res) => {
	try {
		const { id } = req.params; // `id` をリクエストパラメータから取得
		const user = await User.findById(id); // `_id` でユーザーを検索

		if (!user) {
			return res.status(404).json({ message: "ユーザーが見つかりません" }); // ユーザーが見つからない場合、404を返す
		}
		res.status(200).json(user); // 取得成功時にユーザー情報を返す
	} catch (error) {
		handleErrorResponse(res, error, "ユーザー取得に失敗しました");
	}
};

/**
 * ユーザーを新規作成
 * - リクエストボディのデータをもとに、新しいユーザーを作成
 */
exports.createUser = async (req, res) => {
	try {
		const userData = req.body; // リクエストボディからユーザーデータを取得
		const newUser = new User(userData); // 新しいUserモデルのインスタンスを作成
		await newUser.save(); // MongoDB にデータを保存

		res.status(201).json({ message: "ユーザー作成成功", user: newUser }); // 201 (Created) ステータスで成功レスポンス
	} catch (error) {
		handleErrorResponse(res, error, "ユーザー作成に失敗しました");
	}
};

/**
 * ユーザー情報を更新
 * - 指定された `id` のユーザー情報を更新する
 */
exports.updateUser = async (req, res) => {
	try {
		const { id } = req.params; // `id` をリクエストパラメータから取得
		const updateData = req.body; // 更新データを取得

		// 指定された `id` のユーザー情報を更新
		const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

		if (!updatedUser) {
			return res.status(404).json({ message: "ユーザーが見つかりません" }); // 更新対象のユーザーが見つからない場合
		}
		res.status(200).json({ message: "ユーザー更新成功", user: updatedUser }); // 更新成功時のレスポンス
	} catch (error) {
		handleErrorResponse(res, error, "ユーザー更新に失敗しました");
	}
};

/**
 * ユーザーを削除
 * - 指定された `id` のユーザーを削除する
 */
exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params; // `id` をリクエストパラメータから取得
		console.log("削除リクエスト受信 ID:", id); // デバッグ用のログ

		const deletedUser = await User.findByIdAndDelete(id); // 指定 ID のユーザーを削除

		if (!deletedUser) {
			return res.status(404).json({ message: "ユーザーが見つかりません" }); // ユーザーが存在しない場合
		}
		res.status(200).json({ message: "ユーザー削除成功" }); // 削除成功のレスポンス
	} catch (error) {
		handleErrorResponse(res, error, "ユーザー削除に失敗しました");
	}
};
