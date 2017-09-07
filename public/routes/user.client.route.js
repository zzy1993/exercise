angular.module('user')
	.config(['$routeProvider', 
		function ($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: '/public/views/user.client.view.html'
			})
		}
	]);