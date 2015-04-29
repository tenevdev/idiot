define(['jquery', 'ignite'], function($) {
    var DataChartController = function($scope, $routeParams, HubResource, HubSelectionService) {

        $scope.$on('HubSelectionChange', function(e, hub) {
            HubResource.listDataPoints({
                user: $routeParams.user,
                project: $routeParams.project,
                hubId: hub._id
            }, function success(data, headers) {
                for (var i = data.length - 1; i >= 0; i--) {
                    data[i].timeStamp = new Date(data[i].timeStamp)
                }

                $('#data-chart-' + hub._id).igDataChart({
                    width: "100%",
                    height: "400px",
                    title: hub.name,
                    subtitle: "Time / Value Data Chart",
                    dataSource: data,
                    axes: [{
                        name: "TimeAxis",
                        type: "categoryDateTimeX",
                        title: "Time",
                        formatLabel: function(item) {
                            return item.toLocaleTimeString()
                        },
                        dateTimeMemberPath: 'timeStamp'
                    }, {
                        name: "ValueAxis",
                        type: "numericY",
                        minimumValue: 0,
                        title: hub.name + " value",
                    }],
                    series: [{
                        name: "Value",
                        type: "line",
                        isHighlightingEnabled: true,
                        isTransitionInEnabled: true,
                        xAxis: "TimeAxis",
                        yAxis: "ValueAxis",
                        valueMemberPath: "data"
                    }]
                })

                $('#zoombar-' + hub._id).igZoombar({
                    target: '#data-chart-' + hub._id
                })
            })
        })
    }

    DataChartController.$inject = ['$scope', '$routeParams', 'HubResource', 'HubSelectionService']

    return DataChartController
})
