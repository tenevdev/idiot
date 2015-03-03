define([
    'angular',
    './tabs/tabs-controller',
    './project-list/project-list-controller',
    'angularRoute',
    'angularAria',
    'angularAnimate',
    'angularMaterial',
    './user-account/user-account',
    'components/project-service/project-service'
], function(angular, TabsController, ProjectListController) {

    // Create main application module
    var Application = angular.module('Application', ['ngRoute', 'ngMaterial', 'UserAccount', 'ProjectService'])

    Application.controller('TabsController', TabsController)
    Application.controller('ProjectListController', ProjectListController)

    // Configure routes
    Application.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            // Enable HTML5 routing
            $locationProvider.html5Mode(true)

            $routeProvider
            .when('/', {
                controller: 'ProjectListController',
                controllerAs: 'projectCtrl',
                templateUrl: '/views/home'
            })
        }
    ])

    return Application
})
