/**
 * 
 */

var mongoose = require('mongoose');
var image = mongoose.model('Image');

exports.getImage = function (req, res) {
    image.findOne({ _id: req.query.imageId})
        .exec(function (err, image) {
            if (!image){
                res.json(404, {msg: 'Image Not Found.'});
            }
            else {
                res.json(image);
            }
        });
};

exports.getImages = function (req, res) {
    image.find()
        .exec(function (err, images) {
            if (!images){
                res.json(404, {msg: 'Images Not Found.'});
            }
            else {
                res.json(images)
            }
        });
};