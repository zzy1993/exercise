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

exports.loginUser = function (req, res) {
    User.findOne({username: req.body.username})
        .exec(function (err, user) {
            if(!user){
                res.json(404, {msg: 'User Not Found.'});
                res.redirect('/');
            }else if (user.passwordHashed == hashPassword(req.params.password)){
                req.session.regenerate(function () {
                    req.session.userId = user._id;
                    req.session.username = user.username;
                })
            }else{
                res.redirect('/login');
            }
        });
};

exports.getUser = function (req, res) {
    User.findOne({_id: req.body.userId})
        .exec(function (err, user) {
            if(!user){
                res.json(404, {msg: 'User Not Found.'});
            }else{
                res.json(user);
            }
        });
};

exports.addUser = function (req, res) {
    var user = new User({username: req.body.username, email: req.body.email});
    user.set('passwordHashed', hashPassword(req.body.password));
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