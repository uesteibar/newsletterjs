newsletterjs.controller('HeaderCtrl', function($scope, database, $location){


	$scope.isActive = function(viewLocation){
		var array = $location.path().split("/");
		return viewLocation === array[1];
	};
});