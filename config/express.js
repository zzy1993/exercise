var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function(){
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.use(session({
		secret: 'SECRET',
		cookie: {maxAge: 60 * 60 * 1000}
	}));

	app.set('views', __dirname + '/app/views');
	app.set('view engine', 'html');
	app.engine('.html', require('ejs').__express);

	// app.use(passport.initialize());
	// app.use(passport.session());
	
	require('../app/routes/user.server.route')(app);
	require('../app/routes/image.server.route')(app);
	require('../app/routes/comment.server.route')(app);

	app.use('/public', express.static(__dirname + '/../public'));
	app.use('/img', express.static(__dirname + '/../img'));
	app.use('/lib', express.static(__dirname + '/../lib'));

	app.use('*', function (req, res) {
		res.status(404).send('Content Not Found.');
	});

	return app;
};