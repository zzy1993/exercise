angular
	.module('profile')
	.controller('profileController', profileController);

function profileController($scope, userService) {
  
	$scope.getUser = getUser;

  function getUser(){
	  userService.getUser(userId)
      .then(function success(res) {
        window.location.href = '/config';
      }, function error(res) {
        console.log('error');
      });
  }
}
