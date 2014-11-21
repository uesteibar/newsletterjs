newsletterjs.controller('HeaderCtrl', function($scope, database, $location){

	database.open();

	$scope.isActive = function(viewLocation){
		return viewLocation === $location.path();
	};
});