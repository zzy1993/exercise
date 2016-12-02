/**
 * Created by Aleph on 28/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    // username should be unique
    username: {type: String, unique: true},
    passwordHashed: String,
    email: String
});

mongoose.model('User', UserSchema);
