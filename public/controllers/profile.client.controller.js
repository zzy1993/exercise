angular
	.module('galler')
	.controller('profileController', profileController);

function profileController($scope, userService) {
  
	$scope.getUser = getUser;

  function getUser(){
	  userService.getUser(userId)
      .then(function success(res) {
        $location.path('/image');
      }, function error(res) {
	      res.json(404, {msg: 'Fail to get user'});
      });
  }
}
