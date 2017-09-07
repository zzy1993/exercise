angular.module('image')
	.service('commentService', ['$http',
		function($http){
			this.getComment = function(commentId, callback) {
				$http.get('/api/comments/' + commentId)
					.then(function success(res) {
						callback(null, res);
					}, function error(res) {
						callback(res, {});
					});
			};

			this.postComment = function(commentIdRoot, commentIdParent, commentNew, callback){
				$http.post('/api/comments', {
						commentIdRoot: commentIdRoot,
						commentIdParent: commentIdParent,
						commentNew: commentNew
					}, {headers: {"Content-Type": "application/json"}}
				)
					.then(function success(res) {
						callback(null, res);
					}, function error(res) {
						callback(res, {});
					});
			};
			
		}
	]);