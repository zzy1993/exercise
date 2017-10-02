var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
	firstName: String,
	lastName: String,
  email: String,
	google: {
		id: String,
		token: String
	},
	facebook: {
		id: String,
		token: String
	}
});

var User = mongoose.model('User', UserSchema);

User.selectUser = selectUser;
User.insertUser = insertUser;
User.selectUserByUsername = selectUserByUsername;
User.selectUserByFacebookId = selectUserByFacebookId;
// User.findUserByGoogleId = findUserByGoogleId;

module.exports = User;

function selectUser (userId) {
	return User.findOne({userId: userId});
}

function selectUserByUsername (username) {
	return User.findOne({username: username});
}

function selectUserByFacebookId (facebookId) {
	return User.findOne({'facebook.id': facebookId});
}

function insertUser (user) {
	return new User(user).save();
}

// function findUserByGoogleId (googleId) {
// 	return User.findOne({googleId: googleId});
// }



