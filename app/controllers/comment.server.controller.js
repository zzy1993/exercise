var Comment = require('../models/comment.server.model');
var Reply = require('../models/reply.server.model');

module.exports = {
	getCommentTree: getCommentTree, //commentId
	postReply: postReply //username, body, parentId
};

function getCommentTree(req, res){
  var commentId = req.params.commentId;
  Comment.selectComment(commentId)
	  .then(function (comment) {
		  return buildCommentTree(comment.toObject());
	  })
	  .then(function (commentTree) {
		  console.log('commentTree', commentTree);
		  res.json(commentTree);
	  });
}

function buildCommentTree(parent) {
	var promises = [];
	for(var i = 0; i < parent.replyIds.length; ++i) {
		promises.push(
			Reply.selectReply(parent.replyIds[i])
	    .then(function (reply) {
		    return buildCommentTree(reply.toObject());
	    })
		);
  }
	return Promise.all(promises)
		.then(function(replies){
			parent.replies = replies;
			return Promise.resolve(parent);
		});
}

function postReply(req, res) {
	var reply = {
		// username: req.body.username,
		username: generateUsername(),
		body: req.body.replyBody,
		replyIds: []
	};
	Reply.insertReply(reply)
		.then(function(reply2) {
			return Promise.all([
				Comment.updateParentReplyIds(req.body.parentId, reply2._id),
				Reply.updateParentReplyIds(req.body.parentId, reply2._id)
			]);
		})
		.then(function (array) {
			res.json(array[0]?array[0]:array[1]);
		});
}

function generateUsername(){
  var users = ['Alex', 'Bob', 'Claire', 'Dick', 'Emma', 'Frederic', 'George', 'Helen', 'Ian'];
  return users[Math.floor(Math.random() * users.length)];
}