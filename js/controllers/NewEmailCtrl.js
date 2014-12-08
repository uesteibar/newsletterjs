newsletterjs.controller('NewEmailCtrl', function($scope, database, $location, cfpLoadingBar){
	var emaillists;
	$scope.getEmailLists = function(){
		database.getEmailLists().then(function (data) {
			emaillists = data;

			var i = 0;
			for (i=0; i<emaillists.length; i++){
				var emails = [];
				emails = emaillists[i].addresses;
				var toAdd = {
					name: emaillists[i].name,
					id: emaillists[i].id,
					emails: emails,
					selected: true
				};
		$scope.listsToSelect.push(toAdd);

	}
                }, function (err) {
                    console.log(err);
                });
	};

	$scope.getEmailLists();

	$scope.listsToSelect = [];


	$scope.getAccounts = function(){
		database.getAccounts().then(function (data) {
			$scope.accounts = data;
			$scope.selectedAccount = $scope.accounts[0];
			$scope.transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: $scope.selectedAccount.address,
			pass: $scope.selectedAccount.password
		}
	});
			console.log($scope.selectedAccount);
			console.log($scope.accounts);

                }, function (err) {
                    console.log(err);
                });
	};

	$scope.getAccounts();

	var nodemailer = require('nodemailer');



	$scope.setAccount = function(){
		$scope.transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: $scope.selectedAccount.address,
			pass: $scope.selectedAccount.password,
		}
	});
		console.log($scope.selectedAccount.address);
		console.log($scope.selectedAccount.password);
		console.log($scope.transporter);

	};

	$scope.email = {sent: false, dests: "", subject: "", content: ""};

	$scope.saveEmail = function(){
		$scope.email.sent = false;
		database.saveEmail($scope.email).then(function () {
			console.log($scope.email);
			$scope.email.dests = null;
			$scope.email.subject = null;
			$scope.email.content = null;
			toastr.success("Email saved");
		}, function (err) {
			console.log(err);
			toastr.error("Email couldn't be saved");
		});
	};


	$scope.sendEmail = function(){
		cfpLoadingBar.start();
		var recipients = "";
		var i = 0;
		for (i=0; i<$scope.listsToSelect.length; i++){
			if ($scope.listsToSelect[i].selected == true) {
				var j = 0;
				recipients += $scope.listsToSelect[i].emails.join(",") ;
				if (i!=$scope.listsToSelect.length - 1){
					recipients += ", ";
				}
			}
		}


		console.log(recipients);
		$scope.email.subject += " ";
		var mailOptions = {
		    from: $scope.selectedAccount.address	, // sender address
		    bcc: recipients, // list of receivers
		    subject: $scope.email.subject, // Subject line
		    text: $scope.email.content, // plaintext body
		    html: $scope.email.content // html body
		};
		console.log(mailOptions.subject);

		$scope.transporter.sendMail(mailOptions, function(error, info){
			if (error){
				console.log(error);
				toastr.error("Email couldn't be sent");
				cfpLoadingBar.complete();
			}else{
				console.log('Email sent: ' + info.response);
				$scope.email.sent = true;
				cfpLoadingBar.complete();
				toastr.success("Email sent");
				database.saveEmail($scope.email).then(function () {
					console.log($scope.email);
					$scope.email.dests = null;
					$scope.email.subject = null;
					$scope.email.content = null;
				}, function (err) {
					console.log(err);
				});
			}
		});

	};
});