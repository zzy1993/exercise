angular.module('user')
	.controller('userController', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
		$scope.data = {
			username: '',
			password: '',
			isSigninCard: true,
			error: ''
		};
		$scope.showSigninCard = function () {
			$scope.data.isSigninCard = true;
		};
		$scope.showSignupCard = function () {
			$scope.data.isSigninCard = false;
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
					$location.path('/images');
				}, function error(res) {
					$scope.data.error = res.body;
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
				$location.path('/image');
			}, function error(res) {
				$scope.data.error = res.body;
			});
		};
		
		$scope.walkaround = function(){
			$location.path('/image');
		};

		$scope.logout = function(){
			$http.delete('/api/session')
				.then(function success(res) {
					$location.path('/');
				}, function error(res) {
					console.log('error');
				});
		};
	}]);