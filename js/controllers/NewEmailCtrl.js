newsletterjs.controller('NewEmailCtrl', function($scope, database, $location){
	var nodemailer = require('nodemailer');
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'email',
			pass: 'userpass'
		}
	});


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
		    from: 'UEsteibar <uesteibar@gmail.com>', // sender address
		    to: $scope.email.dests, // list of receivers
		    subject: $scope.email.subject, // Subject line
		    text: $scope.email.content, // plaintext body
		    html: $scope.email.content // html body
		};

		transporter.sendMail(mailOptions, function(error, info){
			if (error){
				console.log(error);
			}else{
				console.log('Email sent: ' + info.response);
			}
		});

	};
});