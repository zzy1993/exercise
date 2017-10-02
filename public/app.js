var appName = "app";
var app = angular.module(appName, ['galler']);

app.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [appName]);
});