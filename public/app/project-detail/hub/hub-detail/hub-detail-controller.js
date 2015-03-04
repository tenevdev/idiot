define(function() {
    var HubDetailController = function($scope, $rootScope, $routeParams, HubResource) {
    	var self = this

    	self.hub = HubResource.get({
                    user: $routeParams.user,
                    project: $routeParams.project,
                    hubId: $routeParams.hubId
                })

        $scope.$watch(angular.bind(this, function() {
            return this.$parent.selectedHub; // `this` IS the `this` above!!
        }), function(newVal, oldVal) {
            if (newVal) {
                self.hub = HubResource.get({
                    user: $routeParams.user,
                    project: $routeParams.project,
                    hubId: newVal
                })
            }
        })
    }
    HubDetailController.$inject = ['$scope', '$rootScope', '$routeParams', 'HubResource']
    return HubDetailController
})