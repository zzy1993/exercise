angular.module('image')
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.when('/image', {
				templateUrl: '/public/views/image.client.view.html'
			});
		}
	]);