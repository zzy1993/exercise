/**
 *
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/exercise');

require('./app/models/imageModel.js');
require('./app/models/commentModel.js');

var Image = mongoose.model('Image');
var Comment = mongoose.model('Comment');

function addImage(title, filename) {
    // BUG: sequence of save
    var comment = new Comment({title: title + " Comments"});
    comment.save(function (err, image) {
        var image = new Image({title: title, filename: filename});
        image.commentId = comment._id;
        // BUG: images.save()
        image.save(function () {
            console.log(comment);
            console.log(image);
            console.log(title + " is saved.");
        });
    });
}

Comment.remove().exec(function () {
    Image.remove().exec(function () {
        addImage('Brook in NH', 'brook.jpg');
        addImage('Mountain and water', 'mountain_and_water.jpg');
        addImage('Fog and hidden road', 'fog.jpg');
        addImage('Rail bridge near Conway', 'rail_bridge.jpg');
        addImage('Path near Livermore', 'path_of_leaves.jpg');
        addImage('Sugar hill', 'sugar_hill.jpg');
    });
});
