define(function() {
    var HubListController = function($scope, $routeParams, HubResource) {
        var self = this

        this.selectedHub = {}

        this.hubs = HubResource.query({
            user: $routeParams.user,
            project: $routeParams.project
        }, function success(hubs, headers) {
        })

        this.select = function(hub) {
            if (hub != this.selectedHub) {
                this.selectedHub = hub
                $scope.$broadcast('HubSelectionChange', this.selectedHub)
            }
        }

    }

    HubListController.$inject = ['$scope', '$routeParams', 'HubResource']

    return HubListController
})
