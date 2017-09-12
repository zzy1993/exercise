var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

module.exports = {
	getUser: getUser, //userId
	postUser: postUser //username, password, email
};

function getUser (req, res) {
  User.selectUser(req.params.userId)
    .then(function (user) {
      if(!user){
        res.json({msg: 'User not found.'});
      }else if (req.session.userId == req.params.userId){
        res.json(user);
      }else{
	      res.json({msg: 'Fail to get config information.'});
      }
    });
}

function postUser (req, res) {
  User.selectUser(req.body.username)
    .then(function (user) {
	    if (!user) {
		    user = {
			    username: req.body.username,
			    password: hashPassword(req.body.password),
			    email: req.body.email
		    };
		    return User.insertUser(user);
	    }
	    else{
		    res.json({msg: 'Already used.'});
	    }
    })
    .then(function (user) {
      req.session.regenerate(function () {
        req.session.userId = user._id;
        req.session.username = user.username;
        res.json({msg: user.username + ' is added successfully.'});
      });
    })
	  .catch(function () {
        res.json(404, {msg: 'Fail to create account.'});
	  });
}

function hashPassword(password){
  return crypto.createHash('sha256')
    .update(password.toString())
    .digest('base64')
    .toString();
}