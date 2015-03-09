define([], function() {

    var HubSelectionService = function($rootScope) {
        this.selectedHub = {}

        this.select = function(hub) {
            this.selectedHub = hub
            $rootScope.$broadcast('HubSelection', hub)
        }
    }

    HubSelectionService.$inject = ['$rootScope']
    return HubSelectionService
})
