/**
 * define module to set routes
 */

var express = require('express');

module.exports = function (app) {

    // accessible files
    app.use('/', express.static(__dirname + '/app/views'));
    app.use('/static', express.static(__dirname + '/app/static'));
    app.use('/imgs', express.static(__dirname + '/imgs'));
    app.use('/lib', express.static(__dirname + '/lib'));

    // response with template file
    app.get('/', function (req, res) {
        res.render('index.html');
    });

    // import controller modules
    var image = require('./app/controllers/imageController.js');
    var comment = require('./app/controllers/commentController.js');

    // define request route to methods in controllers
    app.get('/image', image.getImage);
    app.get('/images', image.getImages);
    app.get('/comment', comment.getComment);
    app.post('/comment', comment.addComment);
    app.use('*', function (req, res) {
        res.send('Content Not Found.', 404);
    });
};

