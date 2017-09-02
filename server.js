var express = require('express');
var mongoose = require('mongoose');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var bodyParser = require('body-parser');

// var db = mongoose.connect('mongodb://localhost/exercise');
var db = mongoose.connect('mongodb://heroku_pgmh8nft:q1tbb7054k1o5718198qsfck7c@ds111798.mlab.com:11798/heroku_pgmh8nft');

// db.on('error', function (err) {
//     log.error('Connection error:', err.message);
// });
// db.once('open', function () {
//     log.info("Connected to DB");
// });

require('./app/models/imageModel.js');
require('./app/models/commentModel.js');
require('./app/models/userModel.js');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(expressSession({
    secret: 'SECRET',
    cookie: {maxAge: 60 * 60 * 1000},
    store: new mongoStore({
        mongooseConnection: db.connection,
        collection: 'sessions'
    })
}));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

require('./routes')(app);

//Specified port in Heroku
var port = 3000 || process.env.PORT;
app.listen(port);