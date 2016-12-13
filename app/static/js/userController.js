/**
 * Created by Aleph on 10/12/2016.
 */

var app = angular.module('myApp', []);

app.controller('userController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.login = function (username, password) {
        $http.post('/api/session',
            {username: username,
                password: password},
            {headers: {"Content-Type": "application/json"}})
            .then(function successCallback(res) {
                window.location.href = '/image';
            }, function errorCallback(res) {
            });
    };

    $scope.signup = function(username, password, email){
        $http.post('/api/users',
        {username: username,
            password: password,
            email: email},
        {headers: {"Content-Type": "application/json"}})
            .then(function successCallback(res) {
                window.location.href = '/image';
            }, function errorCallback(res) {
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
