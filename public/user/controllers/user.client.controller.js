angular.module('user')
	.controller('userController', ['$scope', '$http',
	function ($scope, $http) {
		$scope.data = {
			username: '',
			password: '',
			isSignin: true
		};
		$scope.showSignin = function () {
			$scope.data.isSignin = true;
		};
		$scope.showSignup = function () {
			$scope.data.isSignin = false;
		};

		$scope.signin = function (username, password) {
			$http.post('/api/session', {
				username: username,
				password: password
			}, {
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(function success(res) {
					window.location.href = '/image';
				}, function error(res) {
					
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
				window.location.href = '/image';
			}, function error(res) {
				
			});
		};
	}]);