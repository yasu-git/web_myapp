var express = require('express');
var router = express.Router();
//const cors = require('cors'); app.jsに移動
//require('dotenv').config(); app.jsに移動
const User = require('../model/User');

/*database.jsに移動のため不要
// 接続情報を設定
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);
*/

// corsミドルウェアを使用
//router.use(cors());  app.jsに移動

router.get('/', async (req, res) => {
	/*
		// データベース、コレクションを指定
	const database = client.db('notes');
	const notes = database.collection('notes');

	// 全てのドキュメントを取得
	const note = await notes.find({}).toArray();
	res.json(note);
	*/

	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ success: false, message: 'Error fetching data', error });
	}

})

module.exports = router;