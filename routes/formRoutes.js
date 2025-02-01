const express = require('express');
const router = express.Router();
const cors = require('cors');
const User	= require('../model/User');
require('dotenv').config();

// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

// corsミドルウェアを使用
router.use(cors());

// フォームデータの保存
router.post('/', async (req, res) => {
  try {
	console.log('Form data received:', req.body);
	// フォームデータを取得
	const {name, email, tel} = req.body;

	// フォームデータを新規作成
	const newUser = newUser({name, email, tel});

	// データベースに接続
	await client.connect();

	// データベース、コレクションを指定
	const database = client.db('notes');

	// ドキュメントを挿入
	const result = await database.collection('notes').insertOne(newUser);



    res.status(201).json({ success: true, message: 'Form submitted successfully!', data: newUser });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ success: false, message: 'Error saving data', error });
  }
});

module.exports = router;
