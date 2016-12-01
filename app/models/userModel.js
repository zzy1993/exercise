/**
 * Created by Aleph on 28/11/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    passwordHashed: String,
    email: String
});

mongoose.model('User', UserSchema);
