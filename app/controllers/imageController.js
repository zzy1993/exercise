/**
 * getImage, GET: imageId
 *      image
 *
 * getImages, GET
 *      images
 */

var mongoose = require('mongoose');
var Image = mongoose.model('Image');

// /image?imageId
exports.getImage = function (req, res) {
    Image.findOne({ _id: req.query.imageId})
        .exec(function (err, image) {
            if (!image){
                res.status(404)
                    .json({msg: 'Image Not Found.'});
            }else {
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

exports.apiGetImages = function (req, res){
    res.json({msg: 'Sorry, GET images still building now.'});
};

exports.apiPostImages = function (req, res){
    res.json({msg: 'Sorry, POST images still building now.'});
};

exports.apiDeleteImages = function (req, res){
    res.json({msg: 'Sorry, DELETE images still building now.'});
};

exports.apiUpdateImages = function (req, res){
    res.json({msg: 'Sorry, PUT images still building now.'});
};