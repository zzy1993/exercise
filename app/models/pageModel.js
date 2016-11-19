/**
 * define Page model:
 * - name (as id)
 * -- type
 * -- unique
 * - commentId (associate with a comment model
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PageSchema = new Schema({
    name: {type: String, unique: true},
    commentId: Schema.ObjectId
});

// define |PageSchema| as 'Page'
mongoose.model('Page', PageSchema);
