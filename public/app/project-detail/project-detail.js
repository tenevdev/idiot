define([
    'angular',
    './project-detail-controller',
    './hub/hub'
], function(angular, ProjectDetailController, HubCreationController) {
    var ProjectDetail = angular.module('ProjectDetail', ['Hub'])

    ProjectDetail.controller('ProjectDetailController', ProjectDetailController)

    ProjectDetail.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider
                .when('/projects/:user/:project', {
                    controller: 'ProjectDetailController',
                    templateUrl: '/partials/project-detail/project-detail',
                    resolve: {

                    }
                })
        }
    ])

    return ProjectDetail
})
