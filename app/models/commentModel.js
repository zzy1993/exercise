/**
 * define comment model
 * ( structure considered:
 *       a comment tree contains replies
 * 1. replySchema
 * - timestamp
 * - username
 * -- type
 * -- default
 * - content
 * - replies []
 * 2. commentThreadSchema
 * - title
 * - replies []
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReplySchema = new Schema({
    timestamp: { type: Date, default: Date.now},
    username: String,
    title: String,
    body: String,
    replies: [ReplySchema]
}, {
    _id: true
});

var CommentSchema = new Schema({
    title: String,
    replies: [ReplySchema]
});

mongoose.model('Reply', ReplySchema);
mongoose.model('Comments', CommentSchema);