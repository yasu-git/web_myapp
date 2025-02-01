const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');//uuidをインポート

const userSchema = new mongoose.Schema({
	_id: {
		type: String,
		default: uuidv4
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	tel: {
		type: String,
		required: true
	}
}, {
	timestamps: true //作成日時と更新日時を自動的に追加
});

module.exports = mongoose.model('User', userSchema);