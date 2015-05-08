define(function() {
    var HubDetailController = function($scope, $routeParams, HubResource, HubSelectionService) {
        var self = this

        this.select = function(hub) {
            $scope.$broadcast('HubSelectionChange', hub)
            HubSelectionService.select(hub)
        }
    }

    HubDetailController.$inject = ['$scope', '$routeParams', 'HubResource', 'HubSelectionService']

    return HubDetailController
})
