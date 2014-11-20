var newsletterjs = angular.module('newsletterjs',['ngResource', 'ngRoute']);

newsletterjs.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
	$routeProvider.when('/new', {templateUrl: 'partials/newEmail.html', controller: 'NewEmailCtrl'});
	$routeProvider.when('/emails', {templateUrl: 'partials/emails.html', controller: 'EmailsCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);


