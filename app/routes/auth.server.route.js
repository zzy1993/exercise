var auth = require('../controllers/auth.server.controller');
module.exports = function(app) {
	app.get('/auth/facebook', auth.facebook);
	app.get('/auth/facebook/callback', auth.facebookCallback);
};
