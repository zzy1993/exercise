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
        res.render('index.html');
    });
    app.get('/image', image.getImage);
    app.get('/images', image.getImages);
    app.get('/comment', comment.getComment);
    app.post('/comment', comment.addComment);
    app.get('/user', user.getUser);
    app.post('/user', user.addUser);
    app.get('/user/signup', function (req, res) {
        res.render('signup.html');
    });
    app.get('/user/login', function (req, res) {
        res.render('login.html');
    });
    app.post('/user/login', user.loginUser);
    app.get('user/logout', user.logoutUser);

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

