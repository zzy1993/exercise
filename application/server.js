/**
 *
 */
var express = require('express');

// implement data module
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/exercise');
require('./models/commentsModel.js');
require('./models/imageModel.js');
require('./models/pageModel.js');

// implement 
var app = express();
// use file extension as 'html'
app.engine('html', require('ejs').__express);
// specify path for template engine tracing the view template
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// implement routes in express server
require('./routes.js')(app);
app.listen(80);