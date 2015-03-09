define(function() {
    var DataChartController = function($rootScope, $q, HubResource, HubSelectionService) {
        var self = this
        this.isLoaded = false

        // Fake promise to get around ig data source
        this.dataChart = HubResource.listDataPoints()

        // Load data on selection change
        $rootScope.$on('HubSelection', function(e, hub) {
            self.dataChart = HubResource.listDataPoints({
                user: 'admin',
                project: 'adminProject',
                hubId: hub._id,
            }, function success(dataPoints, headers) {
                self.isLoaded = true
            })
        })
    }

    DataChartController.$inject = ['$rootScope', '$q', 'HubResource', 'HubSelectionService']

    return DataChartController
})
