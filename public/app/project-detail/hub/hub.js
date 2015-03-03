define(['angular',
    'hub-creation/hub-creation-controller',
    'hub-detail/hub-detail-controller',
    'hub-list/hub-list-controller',
    '../data-visualization/data-visualization',
    'components/project-service/project-stack/project-stack-service'
], function(angular, HubCreationController, HubDetailController, HubListController) {
    var Hub = angular.module('Hub', ['HubResource', 'DataVisualization'])

    Hub.controller('HubCreationController', HubCreationController)
    Hub.controller('HubDetailController', HubDetailController)
    Hub.controller('HubListController', HubListController)

    return Hub
})
