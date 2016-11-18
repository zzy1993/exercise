/**
 *
 */

var app = angular.module('myApp', []);

app.controller('imageController', ['$scope', '$http',
    function($scope, $http){
        $http.get('/image')
            .success(function (data, status, headers, config) {
                $scope.images = data;
                $scope.image = $scope.images[0];
            })
            .error(function (data, status, headers, config) {
                $scope.images = [];
            });
        $scope.setImage = function(imageId){
            $http.get('/image', {param: {imageId: imageId}})
                .success(function (data, status, header, config) {
                    $scope.image = data;
                })
                .error(function (data, status, header, config) {
                    $scope.image = {};
                });
        }
    }
]);