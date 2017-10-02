var crypto = require('crypto');
var User = require('../models/user.server.model');

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
    })
	  .catch(function (error) {
		  res.json(404, {msg: 'Invalid userId.'});
	  });
}

function postUser (req, res) {
	if(!req.body.username || !req.body.password || !req.body.email){
		res.json(404, {msg: 'Please enter username, password or email.'});
		return;
	}
  User.selectUserByUsername(req.body.username)
    .then(function (user) {
	    console.log('user1: ', user);
	    if (!user) {
		    user = {
			    username: req.body.username,
			    password: hashPassword(req.body.password),
			    email: req.body.email
		    };
		    console.log('user2: ', user);
		    return User.insertUser(user);
	    }
	    else{
		    res.json(404, {msg: 'Account already exist.'});
	    }
    })
    .then(function (user) {
	    console.log('user3: ', user);
      req.session.regenerate(function () {
        req.session.userId = user._id;
        req.session.username = user.username;
        res.json({msg: user.username + ' is added successfully.'});
      });
    })
	  .catch(function (error) {
		  console.log('error:', error);
      res.json(404, {msg: 'Fail to create account.'});
	  });
}

function hashPassword(password){
  return crypto.createHash('sha256')
    .update(password.toString())
    .digest('base64')
    .toString();
}