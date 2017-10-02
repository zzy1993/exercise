angular
  .module('galler')
  .service('commentService', commentService);

function commentService($http){

	return {
		getComment: getComment,
		postReply: postReply
	};

	function getComment(commentId) {
		var url = '/api/comments/' + commentId;
		return $http.get(url);
	}

  function postReply(parentId, replyBody){
	  var url = '/api/replies';
	  var body = {
		  parentId: parentId,
		  replyBody: replyBody
	  };
	  return $http.post(url, body);
  }
}
