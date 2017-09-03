var app = angular.module('app', []);

app.controller('userController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  $scope.login = function (username, password) {
    $http.post('/api/session', {
        username: username,
        password: password
    },{
        headers: {
            "Content-Type": "application/json"
        }
    })
      .then(function successCallback(res) {
        window.location.href = '/image';
      }, function errorCallback(res) {
      });
  };

  $scope.signup = function(username, password, email){
    $http.post('/api/users',{
      username: username,
      password: password,
      email: email
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function success(res) {
        console.log('success');
        window.location.href = '/image';
      }, function error(res) {
        console.log('error');
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

  $scope.getUser = function(){
    $http.get('/api/users/' + userId)
      .then(function successCallback(res) {
        window.location.href = '/user';
      }, function errorCallback(res) {
        console.log('error');
      });
  }
}]);
