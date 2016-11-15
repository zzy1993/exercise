
var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    commentId: Schema.ObjectId
});

