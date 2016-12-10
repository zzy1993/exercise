/**
 * loginUser, POST: username, password
 *      add session: userId, username
 *
 * logoutUser, GET:
 *      delete session
 *      redirect /
 *
 * getUser, GET: username, password
 *      return User
 *
 * addUser, POST: username, password, email
 *      add User: username, passwordHashed, email
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

exports.postSession = function (req, res) {
    User.findOne({username: req.body.username})
        .exec(function (err, user) {
            if(!user){
                res.json(404, {msg: 'User Not Found.'});
                res.redirect('/');
            }else if (user.passwordHashed == hashPassword(req.body.password)){
                // Bug:
                req.session.regenerate(function () {
                    req.session.userId = user._id;
                    req.session.username = user.username;
                    res.redirect('/');
                });
            }else{
                res.redirect('/login');
            }
        });
};

exports.deleteSession = function(req, res) {
    req.session.destroy(function () {
        res.redirect('/login');
    });
};

exports.getUser = function (req, res) {
    User.findOne({_id: req.params.userId})
        .exec(function (err, user) {
            if(!user){
                res.json(404, {msg: 'User Not Found.'});
            }else if (req.session.userId == req.params.userId){
                res.json(user);
            }else{
                res.redirect('/');
            }
        });
};

exports.postUser = function (req, res) {
    console.log(req.body.password, hashPassword(req.body.password));
    var user = new User({username: req.body.username, email: req.body.email});
    user.set('passwordHashed', hashPassword(req.body.password));
    // BUG: redirect should be promised executed
    user.save(function (err) {
        if (err){
            req.session.error = err;
        }else{
            req.session.msg = user.username + ' is created successfully.';
        }
        res.redirect('/');
    });
};

// BUG: .toString()
function hashPassword(password){
    return crypto.createHash('sha256')
        .update(password.toString())
        .digest('base64')
        .toString();
}