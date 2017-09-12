angular
	.module('image')
	.service('imageService', imageService);

function imageService ($http){
	
	return {
		getImage: getImage,
		getImages: getImages
	};

	function getImage(imageId){
		var url = '/api/images/' + imageId;
		return $http.get(url);
	}

	function getImages(){
		var url = '/api/images';
		return $http.get(url);
	}

}