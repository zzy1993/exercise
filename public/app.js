var appName = "galler";
var app = angular.module(appName, ['user']);

app.config(['$locationProvider', function($locationProvider){
	$locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [appName]);
});