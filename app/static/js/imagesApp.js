/**
 * 
 */

var app = angular.module('myApp', []);

app.controller('imageController', ['$scope', '$http', function($scope, $http){
    // /image?imageId=5830f1e57467e640eb4da00f
    $scope.setImage = function(imageId){
        // use 'params' here
        $http.get('/image', {params: {imageId: imageId}})
            .then(function successCallback(res) {
                $scope.image = res.data;
            }, function errorCallback(res) {
                $scope.image = {};
            });
    };
    // /images
    $http.get('/images')
        .then(function successCallback(res) {
            $scope.images = res.data;
            $scope.image = $scope.images[0];
        }, function errorCallback(res) {
            $scope.images = [];
        });
}]);

app.controller('pageController', ['$scope', '$http', function ($scope, $http) {
    // /page
    $scope.setPage = function (pageName) {
        $http.get('/page', {param: {pageName: pageName}})
            .then(function successCallback(res) {
                $scope.page = res.data;
            }, function errorCallback(res) {
                $scope.page = {};
            });
    };
}]);