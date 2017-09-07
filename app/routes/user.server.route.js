var user = require('../controllers/user.server.controller');
module.exports = function (app) {
	app.get('/', function(req, res){
		res.render(__dirname + '/../views/index.html');
	});
	app.get('/api/users/:userId', user.getUser);
	app.post('/api/users', user.postUser);
};