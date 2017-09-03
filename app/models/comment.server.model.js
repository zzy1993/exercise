var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema();
ReplySchema.add({
    timestamp: { type: Date, default: Date.now},
    username: String,
    body: String,
    replies: [ReplySchema]
});

var CommentSchema = new Schema({
    title: String,
    replies: [ReplySchema]
});

mongoose.model('Reply', ReplySchema);
mongoose.model('Comment', CommentSchema);