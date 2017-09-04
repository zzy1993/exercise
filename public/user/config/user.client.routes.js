angular.module('user')
	.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '/public/user/views/user.client.view.html'
		})
			.otherwise({
				redirectTo: '/'
			});
	}
])