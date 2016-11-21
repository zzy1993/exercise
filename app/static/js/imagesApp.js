/**
 *
 */

var app = angular.module('myApp', []);

app.controller('imageController', ['$scope', '$http', function($scope, $http){
    $http.get('/images')
        // /images
        .then(function successCallback(res) {
            $scope.images = res.data;
            $scope.image = $scope.images[0];
        }, function errorCallback(res) {
            $scope.images = [];
        });
    $scope.setImage = function(imageId){
        // /images?imageId=5830f1e57467e640eb4da00f
        $http.get('/images', {param: {imageId: imageId}})
            .then(function successCallback(res) {
                $scope.image = res.data;
            }, function errorCallback(res) {
                $scope.image = {};
            });
        }
    }
]);