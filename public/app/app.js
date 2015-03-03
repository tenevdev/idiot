define([
    'angular',
    './tabs/tabs-controller',
    './project-list/project-list-controller',
    'angularRoute',
    'angularAria',
    'angularAnimate',
    'angularMaterial',
    './user-account/user-account',
    './project-list/project-list'
], function(angular, TabsController, ProjectListController) {

    // Create main application module
    var Application = angular.module('Application', ['ngRoute', 'ngMaterial', 'UserAccount', 'ProjectList'])

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
