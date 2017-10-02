angular
	.module('galler')
	.service('userService', userService);

function userService($http) {

	return {
		postSession: postSession,
		postUser: postUser,
		deleteSession: deleteSession
	};
	
	function postSession (session) {
		var url = '/api/session';
		return $http.post(url, session);
	}

	function postUser (user) {
		var url = '/api/users';
		return $http.post(url, user);
	}
	
	function deleteSession () {
		var url = '/api/session';
		return $http.delete(url);
	}
}