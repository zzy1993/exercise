var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var vars = require('./vars');

module.exports = function(){
	
	mongoose.connect(vars.db_url);

	var app = express();
	
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());

	app.use(cookieParser());
	app.use(session({
		secret:'galler',
		resave:true,
		saveUninitialized:false,
		cookie:{httpOnly: false}
	}));
	
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.engine('.html', require('ejs').__express);

	app.use(passport.initialize());
	app.use(passport.session());

	require('./routes/auth.server.route')(app);
	require('./routes/user.server.route')(app);
	require('./routes/session.server.route')(app);
	require('./routes/image.server.route')(app);
	require('./routes/comment.server.route')(app);
	require('./routes/index.server.route')(app);
	
	app.use('/public', express.static(__dirname + '/../public'));
	app.use('/img', express.static(__dirname + '/../img'));
	app.use('/lib', express.static(__dirname + '/../lib'));
	
	app.use('*', function (req, res) {
		res.status(404).send('Content Not Found.');
	});
	
	return app;
};