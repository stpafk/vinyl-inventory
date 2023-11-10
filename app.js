var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session)
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const catalogRouter =  require('./routes/catalog');

var app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBSession({
  uri: mongoDB,
  collection: "mySessions"
})

app.use(session({
  secret: "Key to assign cookie",
  resave: false,
  saveUninitialized: false,
  store: store,
}))

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/catalog', catalogRouter);
app.use('/uploads', express.static("uploads"))

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
