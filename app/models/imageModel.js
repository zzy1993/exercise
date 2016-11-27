/**
 * define image model:
 * - title
 * - filename
 * - timestamp
 * -- type
 * -- default
 * - commentId  (associate with a comment model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// design schema of imgs table
var ImageSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    title: String,
    filename: String,
    commentId: Schema.ObjectId
});

// add mongoose model
mongoose.model('Image', ImageSchema);