define([
    'angular',
    './project-creation-controller',
    'components/project-service/project-service'
], function(angular, ProjectCreationController) {
    var ProjectCreation = angular.module('ProjectCreation', ['ProjectService'])

    ProjectCreation.controller('ProjectCreationController', ProjectCreationController)

    return ProjectCreation
})
