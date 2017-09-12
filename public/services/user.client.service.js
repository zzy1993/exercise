angular
	.module('user')
	.service('userService', userService);

function userService($http) {

	return {
		postSession: postSession,
		postUser: postUser,
		deleteSession: deleteSession
	};
	
	function postSession (username, password) {
		var url = '/api/session';
		var body = {
			username: username,
			password: password
		};
		return $http.post(url, body);
	}

	function postUser (user) {
		var url = '/api/users';
		var body = {
			username: username,
			password: password,
			email: email
		};
		return $http.post(url, body);
	}
	
	function deleteSession () {
		var url = '/api/session';
		return $http.delete(url);
	}
}