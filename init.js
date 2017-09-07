var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/galler');

require('./app/models/image.server.model.js');
require('./app/models/comment.server.model.js');
require('./app/models/user.server.model.js');

var Image = mongoose.model('Image');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

function addImage(title, filename) {

    var comment = new Comment({title: title});
    comment.save(function (err, comment) {
        var image = new Image({title: title, filename: filename});
        image.commentId = comment._id;

        image.save(function () {
            console.log(title + " is saved.");
        });
    });
}

User.remove().exec(function () {
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
});
