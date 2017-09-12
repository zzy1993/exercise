var comment = require('../controllers/comment.server.controller');
module.exports = function (app) {
	app.get('/api/comments/:commentId', comment.getCommentTree);
	app.post('/api/replies', comment.postReply);
};
