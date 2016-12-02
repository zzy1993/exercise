/**
 * 
 */
var express = require('express');
// implement data module
var mongoose = require('mongoose');
// expressSession: session storage
var expressSession = require('express-session');
// connectMongo: persistent connection
var mongoStore = require('connect-mongo')({session: expressSession});
// bodyParser: parse the body
var bodyParser = require('body-parser');

// BUG: should not use .connect()
var db = mongoose.connect('mongodb://localhost/exercise');

// db.on('error', function (err) {
//     log.error('Connection error:', err.message);
// });
// db.once('open', function callback () {
//     log.info("Connected to DB");
// });

require('./app/models/imageModel.js');
require('./app/models/commentModel.js');
require('./app/models/userModel.js');

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
// select, cookie, store
app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60 * 60 * 1000},
    store: new mongoStore({
        // BUG: 
        mongooseConnection: db.connection,
        collection: 'sessions'
    })
}));

// implement routes in express server
require('./routes.js')(app);
app.listen(3000);