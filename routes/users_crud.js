const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User"); // ユーザーモデルをインポート
const router = express.Router();

/**
 * すべてのユーザーを取得
 */
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		console.error("ユーザー取得エラー:", error);
		res.status(500).json({ message: "ユーザー取得に失敗しました" });
	}
});

/**
 *  特定のユーザーを取得（ID指定）
 */
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		if (!user) {
			return res.status(404).json({ message: "ユーザーが見つかりません" });
		}
		res.status(200).json(user);
	} catch (error) {
		console.error("ユーザー取得エラー:", error);
		res.status(500).json({ message: "ユーザー取得に失敗しました" });
	}
});

/**
 *  ユーザーを新規作成
 */
router.post("/", async (req, res) => {
	try {
		const newUser = new User(req.body);
		await newUser.save();
		res.status(201).json({ message: "ユーザー作成成功", user: newUser });
	} catch (error) {
		console.error("ユーザー作成エラー:", error);
		res.status(500).json({ message: "ユーザー作成に失敗しました" });
	}
});

/**
 *  ユーザー情報を更新
 */
router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await User.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "ユーザーが見つかりません" });
		}
		res.status(200).json({ message: "ユーザー更新成功", user: updatedUser });
	} catch (error) {
		console.error("ユーザー更新エラー:", error);
		res.status(500).json({ message: "ユーザー更新に失敗しました" });
	}
});

/**
 *  ユーザーを削除
 */
router.delete("/:id", async (req, res) => {
	try {
		console.log("削除リクエスト受信 ID:", req.params.id);

		// `_id` を UUID 形式でも削除できるように修正
		const user = await User.findOneAndDelete({ _id: req.params.id });

		if (!user) {
			return res.status(404).json({ message: "ユーザーが見つかりません" });
		}

		res.status(200).json({ message: " ユーザー削除成功" });
	} catch (error) {
		console.error(" ユーザー削除エラー:", error);
		res.status(500).json({ message: " ユーザー削除に失敗しました" });
	}
});

module.exports = router;
