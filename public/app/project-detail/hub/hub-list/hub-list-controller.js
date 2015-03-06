define(function() {
    var HubListController = function($routeParams, HubResource, HubSelectionService) {
        var self = this

        this.isHubSelected = false

        this.hubs = HubResource.query({
            user: $routeParams.user,
            project: $routeParams.project
        }, function success(hubs, headers) {
            if (hubs.length > 0) {
                // Select the first hub
                self.select(hubs[0]._id)
            }
        })

        this.select = function(hubId) {
            HubSelectionService.select(hubId)
            this.isHubSelected = true
        }

    }

    HubListController.$inject = ['$routeParams', 'HubResource', 'HubSelectionService']

    return HubListController
})
