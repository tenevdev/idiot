define(function() {
    var HubListController = function($routeParams, HubResource, HubSelectionService) {
        var self = this

        this.selectedHub = {}

        this.hubs = HubResource.query({
            user: $routeParams.user,
            project: $routeParams.project
        }, function success(hubs, headers) {
            if (hubs.length > 0) {
                // Select the first hub
                self.select(hubs[0])
            }
        })

        this.select = function(hub) {
            HubSelectionService.select(hub)
            this.selectedHub = hub
        }

    }

    HubListController.$inject = ['$routeParams', 'HubResource', 'HubSelectionService']

    return HubListController
})
