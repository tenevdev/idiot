define([
    'angular',
    './tabs/tabs-controller',
    'angularRoute',
    'angularAria',
    'angularAnimate',
    'angularMaterial',
    './user-account/user-account'
], function(angular, TabsController) {

    // Create main application module
    var Application = angular.module('Application', ['ngRoute', 'ngMaterial', 'UserAccount'])

    Application.controller('TabsController', TabsController)

    // Configure routes
    Application.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            // Enable HTML5 routing
            $locationProvider.html5Mode(true)
        }
    ])

    return Application
})
