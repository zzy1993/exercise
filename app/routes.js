/**
 * define module to set routes
 */

var express = require('express');

module.exports = function (app) {

    // import controller modules
    var image = require('./controllers/imageController.js');
    //var pages = require('./controllers/pageController.js');
    // var comments = require('./controllers/commentController.js');

    // define request route to methods in controllers
    app.get('/images', image.getImages);
    app.get('/image', image.getImage);
    // app.get('/page', pages.getPage);
    // app.get('/comments/get', comments.getComment);
    // app.post('/comments/add', comments.addComment);
};

