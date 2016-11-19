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

var ImageSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    title: String,
    filename: String,
    commentId: Schema.ObjectId
});

// define |ImageSchema| as 'Image'
mongoose.model('Image', ImageSchema);