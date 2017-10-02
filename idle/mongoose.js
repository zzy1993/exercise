var mongoose = require('mongoose');
var vars = require('./../app/vars');

module.exports = function () {
	require('../app/models/image.server.model');
	require('../app/models/comment.server.model');
	require('../app/models/user.server.model');
	require('../app/models/reply.server.model');
	
	return mongoose.connect(vars.db_url);
};