/**
 *
 */
var express = require('express');

// implement data module
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/exercise');
// require('./models/commentModel.js');
require('./app/models/imageModel.js');
// require('./models/pageModel.js');

// set view engine and templates
var app = express();
// expect view engine for 'html' template
app.set('view engine', 'html');
// expand ejsForExpress on 'html' template
app.engine('.html', require('ejs').__express);
// path of templates
app.set('views', __dirname + '/app/views');

// implement routes in express server
require('./routes.js')(app);
app.listen(3000);