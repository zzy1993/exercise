var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
	timestamp: { type: Date, default: Date.now},
	username: String,
	body: String,
	replyIds: [Schema.ObjectId]
});

var Reply = mongoose.model('Reply', ReplySchema);

Reply.selectReply = selectReply;
Reply.insertReply = insertReply;
Reply.updateParentReplyIds = updateParentReplyIds;

module.exports = Reply;

function selectReply (replyId) {
	return Reply.findOne(replyId);
}

function insertReply (data, parentId) {
	return new Reply(data).save();
}

function updateParentReplyIds (parentId, replyId) {
	return Reply.update({_id: parentId}, {$push: {replyIds: replyId}});
}
