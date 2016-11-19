/**
 *
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/exercise');

require('./models/imageModel.js');
var image = mongoose.model('Image');

function addImage(title, filename) {
    var image = new Image({title: title, filename: filename});
    image.save(function () {
        console.log(title + " is saved.");
    });
}

