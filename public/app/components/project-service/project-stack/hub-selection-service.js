define([], function() {

    var HubSelectionService = function($rootScope) {
        this.selectedHub = {}

        this.select = function(hub) {
            this.selectedHub = hub
        }
    }

    HubSelectionService.$inject = ['$rootScope']
    return HubSelectionService
})
