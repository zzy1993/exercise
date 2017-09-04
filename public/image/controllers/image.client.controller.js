var app = angular.module('image', []);

function CommentObj($http) {

    this.getComment = function(commentId, callback) {
        $http.get('/api/comments/' + commentId)
            .then(function successCallback(res) {
                callback(null, res);
            }, function errorCallback(res) {
                callback(res, {});
            });
    };

    // BUG: post >> {header} content
    this.postComment = function(commentIdRoot, commentIdParent, commentNew, callback){
        $http.post('/api/comments',
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


app.controller('imageController', ['$scope', '$http', '$window', 'commentService', 
    function($scope, $http, $window, commentService){

    // preset of imageController
    // /images
    $http.get('/api/images')
        .then(function successCallback(res) {
            $scope.images = res.data;
            $scope.image = res.data[0];
            $scope.refreshComment();
        }, function errorCallback(res) {
            $scope.images = [];
        });

    // /image?imageId=5830f1e57467e640eb4da00f
    $scope.setImage = function(imageId){
        // use 'params' here
        $http.get('/api/images/' + imageId)
            .then(function successCallback(res) {
                $scope.image = res.data;
                $scope.refreshComment();
            }, function errorCallback(res) {
                $scope.image = {};
            });
    };

    // BUG: res.data
    $scope.refreshComment = function () {
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
        commentService.postComment($scope.comment._id, commentIdParent, commentNew, function (err, res){
            $scope.refreshComment();
        });
    };

    $scope.logout = function(){
        $http.delete('/api/session')
            .then(function successCallback(res) {
                window.location.href = '/';
            }, function errorCallback(res) {
                console.log('error');
            });
    };
}]);