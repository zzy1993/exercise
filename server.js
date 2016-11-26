/**
 * 
 */
var express = require('express');
var bodyParser = require('body-parser');

// implement data module
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/exercise');

require('./app/models/imageModel.js');
require('./app/models/commentModel.js');

// set view engine and templates
var app = express();
// expect view engine for 'html' template
app.set('view engine', 'html');
// expand ejsForExpress on 'html' template
app.engine('.html', require('ejs').__express);
// path of templates
app.set('views', __dirname + '/app/views');

// BUG: bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// implement routes in express server
require('./routes.js')(app);
app.listen(3000);