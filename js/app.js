var newsletterjs = angular.module('newsletterjs',['ngResource', 'ngRoute', 'textAngular']);

newsletterjs.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
	$routeProvider.when('/new', {templateUrl: 'partials/newEmail.html', controller: 'NewEmailCtrl'});
	$routeProvider.when('/emails', {templateUrl: 'partials/emails.html', controller: 'EmailsCtrl'});
	$routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'SettingsCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);


