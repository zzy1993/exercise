var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    timestamp: {type: Date, default: Date.now},
    title: String,
    filename: String,
    commentId: Schema.ObjectId
});

mongoose.model('Image', ImageSchema);