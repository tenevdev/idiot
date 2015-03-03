define([
    'angular',
    './project-detail-controller',
    './hub-creation/hub-creation-controller',
    './data-visualization/data-visualization',
], function(angular, ProjectDetailController, HubCreationController) {
    var ProjectDetail = angular.module('ProjectDetail', ['DataVisualization'])

    ProjectDetail.controller('ProjectDetailController', ProjectDetailController)
    ProjectDetail.controller('ProjectDetailController', HubCreationController)

    ProjectDetail.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider
                .when('/projects/:user/:project', {
                    controller: 'ProjectDetailController',
                    templateUrl: '/partials/project-detail/project-detail'
                })
                .when('/projects/:user/:project/new-hub', {
                    controller: 'HubCreationController',
                    templateUrl: '/partials/project-detail/hub-creation/hub-creation'
                })
        }
    ])

    return ProjectDetail
})
