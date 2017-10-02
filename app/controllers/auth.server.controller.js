var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user.server.model');
var vars = require('../vars');

exports.facebook = passport.authenticate('facebook', {scope: 'email'});
exports.facebookCallback = passport.authenticate('facebook', {successRedirect: '/#!/image', errorRedirect: '/#!/'});
// exports.google = passport.authenticate('google', {scope: 'email'});
// exports.googleCallback = passport.authenticate('google', {successRedirect: '/#!/image', errorRedirect: '/#!/'});

var facebookConfig = vars.facebook_config;
// var googleConfig = vars.googleConfig;

passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
// passport.use(new LocalStrategy(localStrategy));
// passport.use(new GoogleStrategy(googleConfig, googleStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

function facebookStrategy(token, refreshToken, profile, done) {
	console.log('profile: ', profile);
	User.selectUserByFacebookId(profile.id)
		.then(function (user) {
			console.log('user:', user);
			if(user) return done(null, user);
			console.log('userNew:', user);
			var names = profile.displayName.split(" ");
			console.log(names);
			var facebookUser = {
				firstName: names[0],
				lastName:  names[2],
				email:     profile.emails ? profile.emails[0].value:"",
				facebook: {
					id:    profile.id,
					token: token
				}
			};
			return User.insertUser(facebookUser);
		})
		.then(function (user) {
			console.log('facebookUser', user);
			return done(null, user);
		})
		.catch(function (err) {
			return done(err);
		})
}

// function localStrategy () {
// 	User.selectUserByUsername({username: username})
// 		.then(function(user) {
// 				if (!user) return done(null, false);
// 				return done(null, user);
// 			})
// 		.catch(function(err) {
// 				if (err) return done(err);
// 			}
// 		);
// }

function serializeUser (user, done) {
	done(null, user.id);
}

function deserializeUser (id, done) {
	User.findById(id, function (err, user) {
		done(err, user);
	});
}