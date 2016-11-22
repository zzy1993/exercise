/**
 * /image?imageId
 * /images
 */

var mongoose = require('mongoose');
var Image = mongoose.model('Image');

// /image?imageId=5830f1e57467e640eb4da00f
exports.getImage = function (req, res) {
    Image.findOne({ _id: req.query.imageId})
        .exec(function (err, image) {
            if (!image){
                res.status(404)
                    .json({msg: 'Image Not Found.'});
            }
            else {
                res.json(image);
            }
        });
};

// /images
exports.getImages = function (req, res) {
    Image.find()
        .exec(function (err, images) {
            if (!images){
                res.status(404)
                    .json({msg: 'Images Not Found.'});
            }
            else {
                res.json(images);
            }
        });
};
