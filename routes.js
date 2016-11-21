/**
 * define module to set routes
 */

var express = require('express');
var bodyParser = require('body-parser');

module.exports = function (app) {

    // import controller modules
    var image = require('./app/controllers/imageController.js');
    
    // accessible files
    app.use('/', express.static(__dirname + '/app/views'));
    app.use('/static', express.static(__dirname + '/app/static'));
    app.use('/images', express.static(__dirname + '/images'));
    app.use('/lib', express.static(__dirname + '/lib'));
    app.use(bodyParser());

    // response with template file
    app.get('/', function (req, res) {
        res.render('images.html');
    });

    // define request route to methods in controllers
    app.get('/images', image.getImages);
    app.get('/image', image.getImage);
    app.use('*', function (req, res) {
        console.log('404');
        res.send('404');
    });
};

