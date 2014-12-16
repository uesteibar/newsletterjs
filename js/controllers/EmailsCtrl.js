newsletterjs.controller('EmailsCtrl', function($scope, database, $location){
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
            toastr.error("Email couldn't be deleted");
        });
	};

	$scope.editEmail = function(id){
		console.log(id);
		$location.path('/new/'+id);
	};
	
});