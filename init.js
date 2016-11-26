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
        addImage('Boston_1728_Burgis', 'Boston_1728_Burgis.jpg');
        addImage('Boston_1769_Price_LC', 'Boston_1769_Price_LC.jpg');
        addImage('Boston_1775_deCosta', 'Boston_1775_deCosta.jpg');
        addImage('Boston_1775_Harbor_Wheeler', 'Boston_1775_Harbor_Wheeler.jpg');
    });
});
