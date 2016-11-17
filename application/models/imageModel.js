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

var ImageSchema = Schema({
    title: String,
    filename: String,
    timestamp: { type: Date, default: Date.now},
    commentId: Schema.ObjectId
});

// define |ImageSchema| as 'Image'
mongoose.model('Image', ImageSchema);