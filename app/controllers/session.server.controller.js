var crypto = require('crypto');
var User = require('../models/user.server.model');

module.exports = {
	postSession: postSession, //username, password
	deleteSession: deleteSession
};

function postSession (req, res) {
	if(!req.body.username || !req.body.password){
		res.json(401, {msg: 'Please enter username or password.'});
		return;
	}
	User.selectUserByUsername(req.body.username)
		.then(function (user) {
			if (user.password == hashPassword(req.body.password)){
				req.session.regenerate(function () {
					console.log('user: ', user);
					req.session.userId = user._id;
					req.session.username = user.username;
					res.json({msg: 'Successful login.'});
				});
			}else{
				res.json(403, {msg: 'Please check username or password.'});
			}
		})
		.catch(function (error) {
			console.log('error', error);
			res.json(404, {msg: 'Fail to login.'});
		});
}

function deleteSession (req, res) {
	if(req.session)
		req.session.destroy(function () {
			res.clearCookie('connect.sid', { path: '/' });
			res.json({msg: 'Successful logout.'});
		});
	else
		res.json(404, {msg: 'No session assigned.'});
}

function hashPassword(password){
	return crypto.createHash('sha256')
		.update(password.toString())
		.digest('base64')
		.toString();
}