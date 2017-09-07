var app = angular.module('profile', []);

app.controller('profileController', ['$scope', '$http', '$location',
  function ($scope, $http, $location) {

  
  $scope.logout = function(){
    $http.delete('/api/session')
      .then(function success(res) {
        window.location.href = '/';
      }, function error(res) {
        console.log('error');
      });
  };

  $scope.getUser = function(){
    $http.get('/api/users/' + userId)
      .then(function success(res) {
        window.location.href = '/config';
      }, function error(res) {
        console.log('error');
      });
  }
}]);
