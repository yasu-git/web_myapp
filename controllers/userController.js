const User = require("../models/User");

/**
 * すべてのユーザーを取得
 */
exports.getAllUsers = (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => {
            console.error("ユーザー取得エラー:", error);
            res.status(500).json({ message: "ユーザー取得に失敗しました" });
        });
};

/**
 * 特定のユーザーを取得
 */
exports.getUserById = (req, res) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "ユーザーが見つかりません" });
            }
            res.status(200).json(user);
        })
        .catch(error => {
            console.error("ユーザー取得エラー:", error);
            res.status(500).json({ message: "ユーザー取得に失敗しました" });
        });
};

/**
 * ユーザーを新規作成
 */
exports.createUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save()
        .then(user => res.status(201).json({ message: "ユーザー作成成功", user }))
        .catch(error => {
            console.error("ユーザー作成エラー:", error);
            res.status(500).json({ message: "ユーザー作成に失敗しました" });
        });
};

/**
 * ユーザー情報を更新
 */
exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).json({ message: "ユーザーが見つかりません" });
            }
            res.status(200).json({ message: "ユーザー更新成功", user: updatedUser });
        })
        .catch(error => {
            console.error("ユーザー更新エラー:", error);
            res.status(500).json({ message: "ユーザー更新に失敗しました" });
        });
};

/**
 * ユーザーを削除
 */
exports.deleteUser = (req, res) => {
    console.log("削除リクエスト受信 ID:", req.params.id);
    User.findOneAndDelete({ _id: req.params.id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "ユーザーが見つかりません" });
            }
            res.status(200).json({ message: "ユーザー削除成功" });
        })
        .catch(error => {
            console.error("ユーザー削除エラー:", error);
            res.status(500).json({ message: "ユーザー削除に失敗しました" });
        });
};
