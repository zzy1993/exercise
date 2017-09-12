var mongoose = require('mongoose');
var Image = mongoose.model('Image');

exports.getImage = function (req, res) {
	Image.selectImage(req.params.imageId)
    .then(
	    function(image) {
		    res.json(image);
	    }, function (error) {
		    res.json(404, {msg: 'Image Not Found.'});
	    }
    );
};

exports.getImages = function (req, res) {
  Image.selectImages()
	  .then(
		  function(images) {
			  res.json(images);
		  }, function (error) {
			  res.json(404, {msg: 'Image Not Found.'});
		  }
	  );
};

exports.postImage = function (req, res){
  Image.insertImage(req.body)
    .then(
	    function (success) {
		    res.json({msg: 'Image well posted.'})
	    }
    );
};