define(function() {
    var DataChartController = function($rootScope, $q, HubResource) {
        var self = this
        this.isLoaded = false

        // Fake promise to get around ig data source
        this.dataChart = HubResource.listDataPoints()

        // Load data on selection change
        $rootScope.$on('HubIdSelection', function(e, hubId) {
                self.dataChart = HubResource.listDataPoints({
                    user: 'admin',
                    project: 'adminProject',
                    hubId: hubId,
                }, function success(dataPoints, headers) {
                    self.isLoaded = true
                })
            })
    }

    DataChartController.$inject = ['$rootScope', '$q', 'HubResource']

    return DataChartController
})
