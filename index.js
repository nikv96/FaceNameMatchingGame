var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	mongoose = require('mongoose'),
	passport = require('passport'),
	session = require('express-session'),
	flash = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser')

var configDB = require('./config/database.js')

mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({
	secret: 'bc',
	resave: false,
  	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.use(express.static('public'));

require('./app/populateDB.js')();

app.listen(3000, function(){
	console.log("Connected.");
});
