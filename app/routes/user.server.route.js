var user = require('../controllers/user.server.controller');
module.exports = function (app) {
	app.get('/api/users/:userId', user.getUser);
	app.post('/api/users', user.postUser);
};