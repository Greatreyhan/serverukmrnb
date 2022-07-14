var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');
// connect to database
const url = 'mongodb+srv://justrezy007:Kiko030102@backly.nmfap.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url, {
  useUnifiedTopology : true,
  useNewUrlParser : true,
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// router admin
const adminRouter = require('./routes/admin');
const apiRouter = require('./routes/api')

var app = express();

// allow cors
app.use(cors({
  origin: 'http://localhost:3001'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//  method override
app.use(methodOverride('_method'))

// flash message setup
app.use(session({
  secret : 'keyboard cat',
  resave : false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}))
app.use(flash())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// template sbadmin2
app.use('/sb-admin-2',express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// admin router
app.use('/admin', adminRouter);

// api router
app.use('/api/v1', apiRouter)

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
