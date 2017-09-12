var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  replyIds: [Schema.ObjectId]
});

var Comment = mongoose.model('Comment', CommentSchema);

Comment.selectComment = selectComment;
Comment.insertComment = insertComment;
Comment.updateParentReplyIds = updateParentReplyIds;

module.exports = Comment;

function selectComment (commentId) {
  return Comment.findById(commentId);
}

function insertComment (comment) {
	return new Comment(comment).save();
}

function updateParentReplyIds (parentId, replyId) {
	return Comment.update({_id: parentId}, {$push: {replyIds: replyId}});
}