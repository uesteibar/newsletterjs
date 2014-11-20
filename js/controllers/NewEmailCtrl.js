newsletterjs.controller('NewEmailCtrl', function($scope, database, $location){
	$scope.saveEmail = function(){
		$scope.email.sent = false;
		database.saveEmail($scope.email).then(function () {
			console.log($scope.email);
                    $scope.email.dests = null;
                    $scope.email.subject = null;
                    $scope.email.content = null;
                }, function (err) {
                    console.log(err);
                });
	};
});