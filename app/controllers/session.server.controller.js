var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

module.exports = {
	postSession: postSession, //username, password
	deleteSession: deleteSession
};

function postSession (req, res) {
	User.selectUser(req.body.username)
		.then(function (user) {
			if (user.password == hashPassword(req.body.password)){
				req.session.regenerate(function () {
					req.session.userId = user._id;
					req.session.username = user.username;
					res.json({msg: 'Successful login.'});
				});
			}else{
				res.json({
					msg: 'Fail to login.'
				});
			}
		});
}

function deleteSession (req, res) {
	req.session.destroy(function () {
		res.json({msg: 'Successful logout.'});
	});
}

function hashPassword(password){
	return crypto.createHash('sha256')
		.update(password.toString())
		.digest('base64')
		.toString();
}