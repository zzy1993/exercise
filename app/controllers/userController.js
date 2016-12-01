/**
 * loginUser, POST: username, password
 *      session: userId, username
 *
 * getUser, GET: username, password
 *      
 *
 * addUser, POST: username, password, email
 *      User: username, passwordHashed, email
 */

var mongoose = require('mongoose');
var crypto = require('crypto');
var User = mongoose.model('User');

exports.loginUser = function (req, res) {
    User.findOne({username: req.body.username})
        .exec(function (err, user) {
            if(!user){
                res.json(404, {msg: 'User Not Found.'})
            }else if (user.passwordHashed == hashPassword(req.params.password)){
                req.session.regenerate(function () {
                    req.session.userId = user._id;
                    req.session.username = user.username;
                })
            }
        });
};

exports.getUser = function (req, res) {

};

exports.addUser = function (req, res) {
    var user = new User({username: req.body.username});
    user.set('passwordHashed', hashPassword(req.body.password));
    user.set('email', req.body.email);
    user.save(function (err) {
        if (err){
            res.session.error = err;
        }else{
            req.session.msg = user.username + ' is created successfully.';
        }
        res.redirect('/');
    });
};

function hashPassword(req, res, password){
    return crypto.createHash('sha256')
        .update(pwd)
        .digest('base64')
        .toString();
}