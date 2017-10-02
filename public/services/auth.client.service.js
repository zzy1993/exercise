angular
	.module('galler')
	.factory('authFactory', authFactory);

function authFactory () {
		var userId;
		return {
			setUser: function (userIdNew) {
				userId = userIdNew;
			},
			isLoggedIn: function () {
				return (userId) ? userId : false;
			}
		};
	}