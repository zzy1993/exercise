var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var strategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function () {
	
	passport.Authenticator.serializeUser(function (user, done) {
		done(null, user.id);
	});
	
	passport.Authenticator.deserializeUser(function (id, done) {
		User.findOne({
			_id: id
		}, '-password -salt', function () {
			done(error, user);
		});
	});
	
	passport.use(new Strategy(
		function(username, password, done) {
			User.findOne({ 
				username: username 
			}, function (err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				if (!user.authenticate(password)) { return done(null, false); }
				return done(null, user);
			});
		}
	));
	return done(null, user);
};
