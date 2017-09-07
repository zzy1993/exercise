var mongoose = require('mongoose');
var vars = require('./vars');

module.exports = function () {
	require('../app/models/image.server.model.js');
	require('../app/models/comment.server.model.js');
	require('../app/models/user.server.model.js');
	
	var db = mongoose.connect(vars.db_url);
	// db.on('error', function (err) {
	//   log.error('Connection error:', err.message);
	// });
	// db.once('open', function () {
	//   log.info("Connected to DB");
	// });
	
	return db;
};