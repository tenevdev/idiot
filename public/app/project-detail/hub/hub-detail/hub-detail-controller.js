define(function() {
    var HubDetailController = function($scope, $routeParams, HubResource) {
        var self = this

        this.selectedHub = {}

        this.select = function(hub) {
            if (hub != this.selectedHub) {
                this.selectedHub = hub
                $scope.$broadcast('HubSelectionChange', this.selectedHub)
            }
        }
    }

    HubDetailController.$inject = ['$scope', '$routeParams', 'HubResource']

    return HubDetailController
})
