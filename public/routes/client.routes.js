angular
	.module('galler')
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: '/public/views/user.client.view.html'
				})
				.when('/image', {
					templateUrl: '/public/views/image.client.view.html'
				})
		}
	])
	.run(['$rootScope', '$location', '$cookies', 'authFactory',
		function($rootScope, $location, $cookies, authFactory) {
			$rootScope.$on('$routeChangeStart', function (event, newUrl) {
				if (newUrl.originalPath == '/' && $cookies.get('connect.sid')) {
					event.preventDefault();
					$location.path("/image");
				}
				else if(newUrl.originalPath != '/' && !$cookies.get('connect.sid')) {
					event.preventDefault();
					$location.path("/");
				}
			});
		}
	]);