var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
  timestamp: {type: Date, default: Date.now},
  title: String,
  filename: String,
  commentId: Schema.ObjectId
});

var Image = mongoose.model('Image', ImageSchema);

Image.selectImage = selectImage;
Image.selectImages = selectImages;
Image.insertImage = insertImage;

module.export = Image;

function selectImage(imageId) {
	return Image.findById(imageId);
}

function selectImages(){
	return Image.find();
}

function insertImage(image) {
	return new Image(image).save();
}