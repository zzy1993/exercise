var app = angular.module('profile', []);

app.controller('ProfileController', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {

  
  $scope.logout = function(){
    $http.delete('/api/session')
      .then(function successCallback(res) {
        window.location.href = '/';
      }, function errorCallback(res) {
        console.log('error');
      });
  };

  $scope.getUser = function(){
    $http.get('/api/users/' + userId)
      .then(function successCallback(res) {
        window.location.href = '/profile';
      }, function errorCallback(res) {
        console.log('error');
      });
  }
}]);
