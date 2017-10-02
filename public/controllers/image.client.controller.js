angular
	.module('galler')
	.controller('imageController', imageController);

function imageController ($scope, imageService, commentService){

	$scope.images = [];
	$scope.image = {};
	$scope.comment = {};

	function init() {
		imageService.getImages()
			.then(function(images) {
				$scope.images = images.data;
				$scope.image = images.data[0];
				return commentService.getComment(images.data[0].commentId);
			})
			.then(function(comment){
				$scope.comment = comment.data;
			});
	}
	init();
	
  $scope.selectImage = selectImage;
  $scope.addReply = addReply;

  function selectImage(imageId){
    imageService.getImage(imageId)
	    .then(function(image){
		    $scope.image = image.data;
		    return commentService.getComment(image.data.commentId);
	    })
	    .then(function(comment){
		    $scope.comment = comment.data;
	    })
  }

  function addReply(commentId, parentId, replyBody){
    commentService.postReply(parentId, replyBody)
	    .then(function() {
		    return commentService.getComment(commentId);
	    })
	    .then(function(comment){
		    $scope.comment = comment.data;
	    })
  }
}