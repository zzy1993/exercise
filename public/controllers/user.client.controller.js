angular
	.module('galler')
	.controller('userController', userController);

function userController ($scope, $location, userService) {

	$scope.data = {
		username: '',
		isSigninCard: true,
		errorSignin: '',
		errorSignup: ''
	};
	
	$scope.showSigninCard = showSigninCard;
	$scope.showSignupCard = showSignupCard;
	$scope.signin = signin;
	$scope.signup = signup;
	// $scope.walkaround = walkaround;
	$scope.logout = logout;
	
	function showSigninCard () {
		$scope.data.isSigninCard = true;
	}
	
	function showSignupCard () {
		$scope.data.isSigninCard = false;
	}

	function signin (username, password) {
		var session = {
			username: username,
			password: password
		};
		userService.postSession(session)
			.then(function (res) {
				$scope.data.username = username;
				console.log('username', username);
				$location.path('/image');
			})
			.catch(function (res) {
				$scope.data.errorSignin = res.data.msg;
			});
	}
	
	function signup (username, password, email){
		var user = {
			username: username,
			password: password,
			email: email
		};
		userService.postUser(user)
			.then(function (res) {
				$scope.data.username = username;
				console.log('username', username);
				$location.path('/image');
			})
			.catch(function (res) {
				$scope.data.errorSignup = res.data.msg;
			});
	}

	function logout() {
		userService.deleteSession()
			.then(function (res) {
				$scope.data.username = '';
				$location.path('/');
			})
			.catch(function (res) {
			});
	}
}