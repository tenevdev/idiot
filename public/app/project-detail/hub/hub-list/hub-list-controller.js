define(function() {
    var HubListController = function($routeParams, HubResource) {
        this.hubs = HubResource.query({
            user: $routeParams.user,
            project $routeParams.project
        })
    }

    HubListController.$inject = ['$routeParams', 'HubResource']

    return HubListController
})
