const express = require('express');
const router = express.Router();
//const cors = require('cors'); app.jsに移動
const User = require('../model/User');
//require('dotenv').config(); app.jsに移動

// 接続情報を設定
/*
database.jsに移動のため不要
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
*/
// corsミドルウェアを使用
//router.use(cors());  app.jsに移動

// フォームデータの保存
router.post('/', async (req, res) => {
	try {
		console.log('Form data received:', req.body);
		// フォームデータを取得
		const { name, email, tel } = req.body;

		//すでに同じemailのユーザーがいるか確認
		const exitstringUser = await User.findOne({ email });
		if (exitstringUser) {
			return res.status(400).json({ success: false, message: 'Email already exists' });
		}

		//新しいユーザを作成し、データベースに保存
		// フォームデータを新規作成
		const newUser = new User({ name, email, tel });

		// データベースに接続
		//await client.connect();  database.jsに移動

		/*mongooseを使用するため不要
		// データベース、コレクションを指定
		const database = client.db('notes');

		// ドキュメントを挿入
		const result = await database.collection('notes').insertOne(newUser);
		*/
		// データベースに保存
		const newFormData = await newUser.save();

		res.status(201).json({ success: true, message: 'Form submitted successfully!', data: newFormData });
	} catch (error) {
		console.error('Error saving form data:', error);
		res.status(500).json({ success: false, message: 'Error saving data', error });
	}
});

module.exports = router;
