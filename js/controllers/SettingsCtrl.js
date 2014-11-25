newsletterjs.controller('SettingsCtrl', function($scope, database, $location){
	
	$scope.currentTab = 'emaillists';
	$scope.newAddress = '';


	$scope.getAccounts = function(){
		database.getAccounts().then(function (data) {
			$scope.accounts = data;
			console.log($scope.accounts);

                }, function (err) {
                    console.log(err);
                });
	};

	$scope.getAccounts();

	$scope.getEmailLists = function(){
		database.getEmailLists().then(function (data) {
			$scope.emaillists = data;
			console.log($scope.emaillists);

                }, function (err) {
                    console.log(err);
                });
	};

	$scope.getEmailLists();

	$scope.account = {accountName: "", address: "", password: ""};
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

	$scope.emaillist = {name:"", addresses: []};
	$scope.saveEmailList = function(){
		database.saveEmailList($scope.emaillist).then(function () {
			console.log($scope.emaillist);
			$scope.emaillist.name = null;

			$scope.getEmailLists();
			toastr.success("Email list saved");
		}, function (err) {
			console.log(err);
			toastr.error("Email list couldn't be saved");
		});
	};


	$scope.deleteAccount = function(id){
		database.deleteAccount(id).then(function () {
            $scope.getAccounts();
        }, function (err) {
            $window.alert(err);
        });
	};

	$scope.deleteEmailList = function(id){
		database.deleteEmailList(id).then(function () {
            $scope.getEmailLists();
        }, function (err) {
            $window.alert(err);
        });
	};

	$scope.openList = function(emaillist){
		$scope.currentList = emaillist;
		console.log($scope.currentList);
	};

	$scope.addAddressToList = function(){
		$scope.currentList.addresses.push($scope.newAddress);
		$scope.currentList.name = "actualizado";
		database.updateEmailList($scope.currentList.id, $scope.currentList).then(function () {

			toastr.success("Address added");
		}, function (err) {
			console.log(err);
			toastr.error("Address couldn't be added");
		});
	};


});