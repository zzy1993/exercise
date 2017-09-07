var image = require('../controllers/image.server.controller');
module.exports = function (app) {
	app.get('/api/images/:imageId', image.getImage);
	app.get('/api/images', image.getImages);
};