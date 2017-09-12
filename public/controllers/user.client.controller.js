angular
	.module('user')
	.controller('userController', userController);

function userController ($scope, $location, userService) {

	$scope.data = {
		username: '',
		password: '',
		isSigninCard: true,
		error: ''
	};
	
	$scope.showSigninCard = showSigninCard;
	$scope.showSignupCard = showSignupCard;
	$scope.signin = signin;
	$scope.signup = signup;
	$scope.walkaround = walkaround;
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
			.then(function success(res) {
				$location.path('/images');
			}, function error(res) {
				$scope.data.error = res.data;
			});
	}
	
	function signup (username, password, email){
		var user = {
			username: username,
			password: password,
			email: email
		};
		userService.postUser(user)
		.then(function success(res) {
			$location.path('/image');
		}, function error(res) {
			$scope.data.error = res.body;
		});
	}
	
	function walkaround (){
		$location.path('/image');
	}

	function logout() {
		userService.deleteSession(session)
			.then(function success(res) {
				$location.path('/');
			}, function error(res) {
				console.log('error');
			});
	}
}