var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./config/database'); // 追加
const cors = require('cors');
// ルーティングファイルを読み込む
var indexRouter = require('./routes/index');
var userCrudRouter = require('./routes/users_crud');
var app = express();

//database.jsを読み込む
connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// ミドルウェアを設定
//corsを追加（後で制限をつけれるよう"*"）
app.use(cors({ origin: '*' })); // 追加
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// ルーティングを設定
app.use('/', indexRouter);
/*
userの操作を行うルート
*/
app.use('/api/userCrud',userCrudRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
