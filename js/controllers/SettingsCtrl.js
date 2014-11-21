newsletterjs.controller('SettingsCtrl', function($scope, database, $location){
	

	$scope.getAccounts = function(){
		database.getAccounts().then(function (data) {
			$scope.accounts = data;
			console.log($scope.accounts);

                }, function (err) {
                    console.log(err);
                });
	};

	$scope.getAccounts();



	$scope.saveAccount = function(){
		database.saveAccount($scope.account).then(function () {
			console.log($scope.account);
			$scope.account.accountName = null;
			$scope.account.address = null;
			$scope.account.password = null;
			$scope.getAccounts();
			toastr.success("Account saved");
		}, function (err) {
			console.log(err);
			toastr.error("Account couldn't be saved");
		});
	};


	$scope.deleteAccount = function(id){
		database.deleteAccount(id).then(function () {
            $scope.getAccounts();
        }, function (err) {
            $window.alert(err);
        });
	};
});