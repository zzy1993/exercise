/**
 * 
 */

var app = angular.module('myApp', []);

function CommentObj($http) {
    this.getComment = function(commentId, callback) {
        $http.get('/comment',
            {params: {commentId: commentId}})
            .then(function successCallback(res) {
                callback(null, res);
            }, function errorCallback(res) {
                callback(res, {});
            });
    };

    // BUG: post
    this.addComment = function(commentIdRoot, commentIdParent, commentNew, callback){
        $http.post('/comment',
            {commentIdRoot: commentIdRoot,
                commentIdParent: commentIdParent,
                commentNew: commentNew},
            {headers: {"Content-Type": "application/json"}})
            .then(function successCallback(res) {
                callback(null, res);
            }, function errorCallback(res) {
                callback(res, {});
            });
    };
}
app.service('commentService', ['$http', CommentObj]);

app.controller('imageController', ['$scope', '$http', 'commentService', function($scope, $http, commentService){

    // preset of imageController
    // /images
    $http.get('/images')
        .then(function successCallback(res) {
            $scope.images = res.data;
            $scope.image = res.data[0];
            $scope.getComments();
        }, function errorCallback(res) {
            $scope.images = [];
        });

    // /image?imageId=5830f1e57467e640eb4da00f
    $scope.setImage = function(imageId){
        // use 'params' here
        $http.get('/image',
            {params: {imageId: imageId}})
            .then(function successCallback(res) {
                $scope.image = res.data;
                $scope.getComments();
            }, function errorCallback(res) {
                $scope.image = {};
            });
    };

    // BUG: res.data
    $scope.getComments = function () {
        commentService.getComment($scope.image.commentId, function (err, res) {
            if(err){
                $scope.comment = {};
            }else{
                $scope.comment = res.data;
            }
        });
    };

    $scope.addReply = function(commentIdParent, body){
        var commentNew = {body: body};
        commentService.addComment($scope.comment._id, commentIdParent, commentNew, function (err, res){
            $scope.getComments();
        });
    };
}]);
