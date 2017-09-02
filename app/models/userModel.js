var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, unique: true},
    passwordHashed: String,
    email: String
});

mongoose.model('User', UserSchema);
