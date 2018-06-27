var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');

var expresshbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var pgStore = require('connect-pg-simple');

var hbs = expresshbs.create({
    extname         : 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers			: {
		paginate    : paginateHelper.createPagination,
	},
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var adminsRouter = require('./routes/admin');

var app = express();

require('./config/passport');

// view engine setup
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  store: new (pgStore(session))({
    conString: 'postgres://postgres:abc@localhost:5432/db-banaoonline',
  }),
  secret: 'MySuperSecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});


app.use('/admin', adminsRouter);
app.use('/user', usersRouter);
app.use('/', indexRouter);

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
