var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//引入token验证中间件
const verifyMiddleware=require('./routes/middleware/verify')
//导入路由文件
const indexRouter = require('./routes/index');
const wishRouter = require('./routes/wish');
const adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//挂载路由文件
app.use('/', indexRouter);
//配置许愿管理模块路由path，添加token验证中间件
app.use('/wish', verifyMiddleware.verifyToken,wishRouter);
//配置管理员管理模块路由path，添加token验证中间件
app.use('/admin',verifyMiddleware.verifyToken, adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
