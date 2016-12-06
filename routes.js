/**
 * define module to set routes
 */

var express = require('express');
var crypto = require('crypto');

module.exports = function (app) {

    // accessible files
    app.use('/', express.static(__dirname + '/app/views'));
    app.use('/static', express.static(__dirname + '/app/static'));
    app.use('/imgs', express.static(__dirname + '/imgs'));
    app.use('/lib', express.static(__dirname + '/lib'));

    // import controller modules
    var image = require('./app/controllers/imageController.js');
    var comment = require('./app/controllers/commentController.js');
    var user = require('./app/controllers/userController.js');

    // define route to pages
    app.get('/', function (req, res) {
        if (req.session.user){
            res.render('image.html');
        }else{
            res.redirect('/user/login');
        }
    });
    app.get('/user', function (req, res) {
        if (req.session.user) {
            res.render('user.html');
        }else{
            res.redirect('/user/login');
        }
    });
    app.get('/signup', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        }else{
            res.render('signup.html');
        }
    });
    app.get('/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        }else{
            res.render('login.html');
        }
    });

    // RESTful api
    app.get('/api/images/:imageId', image.getImage);
    app.get('/api/images', image.getImages);
    app.get('/api/comments/:commentId', comment.getComment);
    app.post('/api/comments', comment.postComment);
    app.get('/api/users/:userId', user.getUser);
    app.post('/api/users', user.postUser);
    app.post('/api/session', user.postSession);
    app.delete('/api/session', user.deleteSession);

    // invalid request
    app.use('*', function (req, res) {
        res.send('Content Not Found.', 404);
    });
};