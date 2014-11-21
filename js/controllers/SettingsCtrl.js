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
		}, function (err) {
			console.log(err);
		});
	};
});