var session = require('../controllers/session.server.controller');
module.exports = function (app) {
	app.post('/api/session', session.postSession);
	app.delete('/api/session', session.deleteSession);
};