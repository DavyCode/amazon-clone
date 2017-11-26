var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var flash = require('express-flash')
var ejs   = require('ejs');
var ejs_mate = require('ejs-mate');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');


var secret = require('./config/secret')
//require models
var User = require('./models/user');

//require routes
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();


// Connect to database
const db = mongoose.connect(secret.database, function(err){
  (err)? console.log(err): console.log("Build something Amazing!!!");
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejs_mate)
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
    secret: secret.secretKey,
    resave: true,
    saveUninitialized: true,
    store : new MongoStore({url : secret.database, autoReconnect : true})
}));


app.use(passport.initialize());
app.use(passport.session());

// passport.use(User.createStrategy());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(flash());

// middleware
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});




app.use('/', index);
app.use('/', users);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
