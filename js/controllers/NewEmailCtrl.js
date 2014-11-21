newsletterjs.controller('NewEmailCtrl', function($scope, database, $location){
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


	$scope.sendEmail = function(){
		var mailOptions = {
		    from: $scope.selectedAccount.address	, // sender address
		    to: $scope.email.dests, // list of receivers
		    subject: $scope.email.subject, // Subject line
		    text: $scope.email.content, // plaintext body
		    html: $scope.email.content // html body
		};

		$scope.transporter.sendMail(mailOptions, function(error, info){
			if (error){
				console.log(error);
			}else{
				console.log('Email sent: ' + info.response);
				$scope.email.sent = true;
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