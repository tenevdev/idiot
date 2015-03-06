define([], function() {

    var HubSelectionService = function($rootScope) {
        this._selectedHubId = ''

        this.getSelectedHubId = function(){
            return this._selectedHubId
        }

        this.select = function(hubId){
            this._selectedHubId = hubId
            $rootScope.$broadcast('HubIdSelection', hubId)
        }
    }

    HubSelectionService.$inject = ['$rootScope']
    return HubSelectionService
})
