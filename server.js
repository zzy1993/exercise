var mongoose = require('./config/mongoose');
var express = require('./config/express');
// var passport = require('./config/passport');

var db = mongoose();
var app = express();
var pp = passport();

var port = process.env.PORT || 3000;
app.listen(port);