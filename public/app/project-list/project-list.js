define([
    'angular',
    './project-list-controller',
    './project-featured-controller',
    'components/project-service/project-service'
], function(angular, ProjectListController, ProjectFeaturedController) {
    var ProjectList = angular.module('ProjectList', ['ProjectService'])

    ProjectList.controller('ProjectListController', ProjectListController)
    ProjectList.controller('ProjectFeaturedController', ProjectFeaturedController)

    // Configure routes
    ProjectList.config([
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
                .when('/explore', {
                    controller: 'ProjectFeaturedController',
                    controllerAs: 'projectCtrl',
                    templateUrl: '/views/explore'
                })
        }
    ])

    return ProjectList
})
