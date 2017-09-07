var mongoose = require('./config/mongoose');
var express = require('./config/express');
// var passport = require('./config/passport');

var db = mongoose();
var app = express();
// var pp = passport();

var port = 3000 || process.env.PORT;
app.listen(port);