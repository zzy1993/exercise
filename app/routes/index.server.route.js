module.exports = function (app) {
	app.get('/', function(req, res){
		res.render(__dirname + '/../views/index.html');
	});
};