var express = require('express');
var crypto = require('crypto');

module.exports = function (app) {
    
    // define route to pages
    app.get('/', function (req, res) {
        if (req.session.userId){
            res.redirect('/image');
        }else{
            res.redirect('/signup');
        }
    });
    app.get('/user', function (req, res) {
        if (req.session.userId) {
            res.render('user');
        }else{
            res.redirect('/signup');
        }
    });
    app.get('/login', function (req, res) {
        if (req.session.userId) {
            res.redirect('/image');
        }else{
            res.render('login');
        }
    });
    app.get('/signup', function (req, res) {
        if (req.session.userId) {
            res.redirect('/image');
        }else{
            res.render('signup');
        }
    });
    app.get('/image', function (req, res){
        if (req.session.userId) {
            res.render('image');
        }else{
            res.redirect('/signup');
        }
    });

    var image = require('./app/controllers/imageController');
    var comment = require('./app/controllers/commentController');
    var user = require('./app/controllers/userController');

    // RESTful api
    app.get('/api/images/:imageId', image.getImage);
    app.get('/api/images', image.getImages);
    app.get('/api/comments/:commentId', comment.getComment);
    app.post('/api/comments', comment.postComment);
    app.get('/api/users/:userId', user.getUser);
    app.post('/api/users', user.postUser);
    app.post('/api/session', user.postSession);
    app.delete('/api/session', user.deleteSession);

    app.use('/public', express.static(__dirname + '/public'));
    app.use('/img', express.static(__dirname + '/img'));
    app.use('/lib', express.static(__dirname + '/lib'));

    // invalid request
    app.use('*', function (req, res) {
        res.status(404).send('Content Not Found.');
    });
};