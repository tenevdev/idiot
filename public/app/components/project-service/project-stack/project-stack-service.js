define(['angular',
    './hub-service',
    './hub-selection-service',
    'angularResource'
], function(angular, HubService, HubSelectionService) {
    var ProjectStackService = angular.module('ProjectStackService', ['ngResource'])

    ProjectStackService.factory('HubResource', HubService)
    ProjectStackService.service('HubSelectionService', HubSelectionService)

    return ProjectStackService
})
