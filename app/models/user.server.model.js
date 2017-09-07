var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    email: String
});

mongoose.model('User', UserSchema);
