newsletterjs.controller('HeaderCtrl', function($scope, database, $location){


	$scope.isActive = function(viewLocation){
		return viewLocation === $location.path();
	};
});