define([
    'angular',
    './project-detail-controller',
    './hub-creation/hub-creation-controller',
    './data-visualization/data-visualization',
], function(angular, ProjectDetailController, HubCreationController) {
    var ProjectDetail = angular.module('ProjectDetail', ['DataVisualization'])

    ProjectDetail.controller('ProjectDetailController', ProjectDetailController)
    ProjectDetail.controller('HubCreationController', HubCreationController)

    ProjectDetail.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider
                .when('/projects/:user/:project', {
                    controller: 'ProjectDetailController',
                    templateUrl: '/partials/project-detail/project-detail'
                })
        }
    ])

    return ProjectDetail
})
