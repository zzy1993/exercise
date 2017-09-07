var mongoose = require('mongoose');

module.exports = function () {
	require('../app/models/image.server.model.js');
	require('../app/models/comment.server.model.js');
	require('../app/models/user.server.model.js');
	
	var db = mongoose.connect('mongodb://localhost/exercise');
	// var db = mongoose.connect('mongodb://heroku_pgmh8nft:q1tbb7054k1o5718198qsfck7c@ds111798.mlab.com:11798/heroku_pgmh8nft');
	// db.on('error', function (err) {
	//   log.error('Connection error:', err.message);
	// });
	// db.once('open', function () {
	//   log.info("Connected to DB");
	// });
	
	return db;
}