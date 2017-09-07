angular.module('image')
  .controller('imageController', ['$scope', '$http', 'commentService',
    function($scope, $http, commentService){

      $http.get('/api/images')
      .then(function success(res) {
        $scope.images = res.data;
        $scope.image = res.data[0];
        $scope.refreshComment();
      }, function errorCallback(res) {
        $scope.images = [];
      });

    // /image/5830f1e57467e640eb4da00f
    $scope.setImage = function(imageId){
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
}]);