newsletterjs.controller('EmailsCtrl', function($scope, database, $location){
	$scope.title = "hello world I'm EmailsCtrl";

	$scope.getEmails = function(){
		database.getEmails().then(function (data) {
			$scope.emails = data;
			console.log($scope.emails);

                }, function (err) {
                    console.log(err);
                });
	};

	$scope.getEmails();


	$scope.deleteEmail = function(id){
		database.deleteEmail(id).then(function () {
            $scope.getEmails();
        }, function (err) {
            $window.alert(err);
        });
	};
	
});