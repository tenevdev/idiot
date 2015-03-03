define(function() {
    var HubCreationController = function($rootScope, $routeParams, HubResource) {
        this.shouldHide = false

        this.submit = function() {
            var newHub = new HubResource({
                name: this.name,
                state: this.state,
                dataStream: {
                    dataType: this.dataType,
                    storeStrategy: 'none'
                }
            })

            newHub.$save({
                user: $rootScope.globals.currentUser.username,
                project: $routeParams.project
            }, function success(hub, headers) {
                // Use to hide view after hub is created
                this.shouldHide = true
            }, function error(response) {
                // Show dialog
            })
        }
    }

    HubCreationController.$inject = ['$rootScope', '$routeParams', 'HubResource']

    return HubCreationController
})
