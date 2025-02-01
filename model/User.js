const mongoose = require('mongoose');
const{v4:uuidv4} = require('uuid');//uuidをインポート

const userSchema = new mongoose.Schema({
	_id:{
		type:String,
		unique:true,//ユニークな値を持つことを指定
		default:uuidv4
	},
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		unique:true,
		required:true
	},
tel:{
	type:String,
	required:true
},
Timestamps:true //作成日時と更新日時を自動的に追加
});

module.exports = mongoose.model('User',userSchema);