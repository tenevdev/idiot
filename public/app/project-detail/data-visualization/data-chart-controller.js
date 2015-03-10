define(function() {
    var DataChartController = function($rootScope, $routeParams, HubResource, HubSelectionService) {
        var self = this
        this.isLoaded = false

        // Fake promise to get around ig data source
        this.dataChart = HubResource.listDataPoints()

        // Load data on selection change
        $rootScope.$on('HubSelection', function(e, hub) {
            self.dataChart = HubResource.listDataPoints({
                user: $routeParams.user,
                project: $routeParams.project,
                hubId: hub._id,
            }, function success(dataPoints, headers) {
                self.isLoaded = true
            })
        })
    }

    DataChartController.$inject = ['$rootScope', '$routeParams', 'HubResource', 'HubSelectionService']

    return DataChartController
})
