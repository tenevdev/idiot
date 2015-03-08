define(function() {
    var HubDetailController = function($rootScope, $routeParams, HubResource, HubSelectionService) {
        var self = this

        $rootScope.$on('HubSelection', function(e, hub) {
            self.hub = hub
        })
    }

    HubDetailController.$inject = ['$rootScope', '$routeParams', 'HubResource', 'HubSelectionService']

    return HubDetailController
})
