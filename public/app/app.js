define([
    'angular',
    './tabs/tabs-controller',
    'angularRoute',
    'angularAria',
    'angularAnimate',
    'angularMaterial',
    'ngMdIcons',
    './user-account/user-account',
    './project-list/project-list',
    './project-detail/project-detail',
    './project-creation/project-creation'
], function(angular, TabsController) {

    // Create main application module
    var Application = angular.module('Application', ['ngRoute', 'ngMaterial', 'UserAccount', 'ProjectList', 'ProjectDetail', 'ProjectCreation'])

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

    Application.run(function($rootScope, $window, $http) {
        var username = $window.sessionStorage.getItem('username'),
            authdata = $window.sessionStorage.getItem('authdata')
        if (username && authdata) {

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            }

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata
        }
    })

    return Application
})
