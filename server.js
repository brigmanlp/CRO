// Include Server Dependencies
var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
mongoose.Promise = Promise;

//Authentication Additional Dependencies
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');

// Create Instance of Express
var app = express();

//Require Schemas


//Require Routes
var routes = require('./routes/auth');
var users = require('./routes/users');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// Set an initial port.
var PORT = process.env.PORT || 5000;

// Run Morgan for Logging
app.use(logger("dev"));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    cookie: { path: "/" },
    saveUninitialized: true,
    resave: false
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

//Non static routes
app.use('/training', routes);
app.use('/users', users);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//MongoDB Configuration 
//need to change name here
var dbURI = 'mongodb://localhost/nytarticles';

if (process.env.NODE_ENV === 'production') {
  //need to add mLab URI here
  dbURI= "mongodb://heroku_xfj05g0m:ujk02k8p0qu0mjd9id7bbf9k45@ds141098.mlab.com:41098/heroku_xfj05g0m";
}
/*
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  // Database configuration with mongoose
  mongoose.connect(dbURI);
}
*/
mongoose.connect(dbURI);
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});
// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

/* Alternate way to render / root route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
*/

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

app.get("/", function(req, res) {
  res.render("index.html");
});
//calling on auth.js to run logic for /training route
app.use(routes);

app.get('/logout', function(req, res){
  req.logout();
  req.session.isAuth = false;
  //add a session cookie here for admins only
  res.redirect('/');
});  
