const User = require("../models/User"); // ユーザーモデルをインポート

/**
 * 共通のエラーハンドリング関数
 * - すべてのエラーレスポンスを統一的に処理するための関数
 * - エラーメッセージと詳細なエラー情報をログに出力
 */
const handleErrorResponse = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ message });
};

/**
 * すべてのユーザーを取得
 * - MongoDB からすべてのユーザーデータを取得する
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // 全ユーザーを取得
        res.status(200).json(users); // 成功時に 200 ステータスでユーザーリストを返す
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
            return res.status(404).json({ message: "ユーザーが見つかりません" });
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
        const newUser = new User(userData); // 新規ユーザーインスタンスを作成
        await newUser.save(); // ユーザーをデータベースに保存

        res.status(201).json({ message: "ユーザー作成成功", user: newUser });
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
            return res.status(404).json({ message: "ユーザーが見つかりません" });
        }
        res.status(200).json({ message: "ユーザー更新成功", user: updatedUser });
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
        console.log("削除リクエスト受信 ID:", id); // デバッグログ

        const deletedUser = await User.findByIdAndDelete(id); // 指定 ID のユーザーを削除

        if (!deletedUser) {
            return res.status(404).json({ message: "ユーザーが見つかりません" });
        }
        res.status(200).json({ message: "ユーザー削除成功" });
    } catch (error) {
        handleErrorResponse(res, error, "ユーザー削除に失敗しました");
    }
};
