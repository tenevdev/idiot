define(function() {
    var HubDetailController = function($scope, $rootScope, $routeParams, HubResource) {
        var self = this

        this.isLoaded = false

        $rootScope.$on('HubIdSelection', function(e, hubId) {
            self.hub = HubResource.get({
                user: $routeParams.user,
                project: $routeParams.project,
                hubId: hubId
            }, function success(hub, headers){
                self.isLoaded = true
            })
        })
    }
    HubDetailController.$inject = ['$scope', '$rootScope', '$routeParams', 'HubResource']
    return HubDetailController
})
