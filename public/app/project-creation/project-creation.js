define([
    'angular',
    './project-creation-controller',
    'components/project-service/project-service'
], function(angular, ProjectCreationController) {
    var ProjectCreation = angular.module('ProjectCreation', ['ProjectService'])

    ProjectCreation.controller('ProjectCreationController', ProjectCreationController)

    UserAccount.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider
                .when('/new-project/:user', {
                    controller: 'ProjectCreationController',
                    templateUrl: '/partials/project-creation/project-creation'
                })
        }
    ])

    return ProjectCreation
})
