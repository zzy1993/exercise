var mongoose = require('mongoose');
var vars = require('./vars');
mongoose.connect(vars.db_url);

require('./models/image.server.model.js');
require('./models/comment.server.model.js');
require('./models/reply.server.model.js');
require('./models/user.server.model.js');

var Image = mongoose.model('Image');
var Comment = mongoose.model('Comment');
var Reply = mongoose.model('Reply');
var User = mongoose.model('User');

function addImage(title, filename) {

  new Comment({title: title}).save()
    .then(function (comment) {
      return new Image({title: title, filename: filename, commentId: comment._id}).save();
      })
	  .then(function (image) {
		  console.log(image.title + " is saved.");
	  })
}

Comment.remove()
	.then(function () {
		return Image.remove();
	})
	.then(function () {
		return Comment.remove();
	})
	.then(function () {
		return Reply.remove();
	})
	.then(function () {
		return User.remove();
	})
	.then(function () {
    addImage('Brook in NH', 'brook.jpg');
    addImage('Mountain and water', 'mountain_and_water.jpg');
    addImage('Fog and hidden road', 'fog.jpg');
    addImage('Rail bridge near Conway', 'rail_bridge.jpg');
    addImage('Path near Livermore', 'path_of_leaves.jpg');
    addImage('Sugar hill', 'sugar_hill.jpg');
  });
