define(['angular',
    './hub-service',
    'angularResource'
], function(angular, HubService) {
    var ProjectStackService = angular.module('ProjectStackService', ['ngResource'])

    ProjectStackService.factory('HubService', HubService)

    return ProjectStackService
})
