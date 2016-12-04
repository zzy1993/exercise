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

    // define request route to methods in controllers
    app.get('/', function (req, res) {
        if (req.session.user){
            res.render('image.html', {username: req.session.username});
        }else{
            res.redirect('/user/login');
        }
    });
    app.get('/image', image.getImage);
    app.get('/images', image.getImages);
    app.get('/comment', comment.getComment);
    app.post('/comment', comment.addComment);
    app.get('/user', function (req, res) {
        if (req.session.user) {
            res.render('user.html');
        }else{
            res.redirect('/user/login');
        }
    });
    app.get('/user/signup', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        }else{
            res.render('signup');
        }
    });
    app.get('/user/login', function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        }else{
            res.render('login.html');
        }
    });
    app.get('/user/logout', function (req, res) {
        req.session.destroy(function () {
            res.redirect('/user/login');
        })
    });
    app.post('/user', user.addUser);
    app.post('/user/login', user.loginUser);

    // RESTful api reservation
    // images
    app.get('/api/images', image.apiGetImages);
    app.post('/api/images', image.apiPostImages);
    app.delete('/api/images', image.apiDeleteImages);
    app.put('/api/images', image.apiUpdateImages);
    // // comments
    // app.get('/api/comments', comment.apiGetImages);
    // app.post('/api/comments', comment.apiPostImages);
    // app.delete('/api/comments', comment.apiDeleteImages);
    // app.put('/api/comments', comment.apiUpdateImages);
    // invalid request
    app.use('*', function (req, res) {
        res.send('Content Not Found.', 404);
    });
};

