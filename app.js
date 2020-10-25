const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
require('./config/passport');

const openingRouter = require('./routes/opening');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

const db = require('./database/db');
db.connectToDB(process.env.DB_URL);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const auth = require('./middlewares/auth');


app.use('/',auth.isLoggedIn, indexRouter);
app.use('/user', userRouter);
app.use('/openings',auth.authenticateJWT, openingRouter);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


module.exports = app;
