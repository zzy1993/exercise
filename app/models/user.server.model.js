var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {type: String, unique: true},
  password: String,
  email: String
});

var User = mongoose.model('User', UserSchema);

User.selectUser = selectUser;
User.insertUser = insertUser;

module.exports = User;

function selectUser (userId) {
	return User.findOne(userId);
}

function insertUser (user) {
	return new User(user).save();
}

