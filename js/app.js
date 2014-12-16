var newsletterjs = angular.module('newsletterjs',['ngResource', 'ngRoute', 'textAngular', 'ui.bootstrap', 'multi-select', 'cfp.loadingBar']);

newsletterjs.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
	$routeProvider.when('/new/:id', {templateUrl: 'partials/newEmail.html', controller: 'NewEmailCtrl'});
	$routeProvider.when('/emails', {templateUrl: 'partials/emails.html', controller: 'EmailsCtrl'});
	$routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'SettingsCtrl'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);


