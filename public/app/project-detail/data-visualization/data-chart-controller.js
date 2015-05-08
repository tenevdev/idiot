define(['jquery', 'igniteDataVisualization'], function($) {
    var DataChartController = function($scope, $routeParams, HubResource) {
        var self = this
        self.seriesType = 'line'
        self.show = false;

        $scope.$on('HubSelectionChange', function(e, hub) {
            if (self.hub) {
                self.show = true
            } else {
                self.hub = hub;
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
                            valueMemberPath: "data",
                            thickness: 5
                        }]
                    })

                    $('#zoombar-' + hub._id).igZoombar({
                        target: '#data-chart-' + hub._id
                    })

                    self.show = true

                    $scope.$watch(function() {
                        return self.seriesType; // `this` IS the `this` above!!
                    }, function(newVal, oldVal) {
                        // Remove old series
                        $('#data-chart-' + self.hub._id).igDataChart("option", "series", [{
                            name: 'Value',
                            remove: true
                        }]);

                        // Add new series
                        $('#data-chart-' + self.hub._id).igDataChart("option", "series", [{
                            type: newVal,
                            name: "Value",
                            xAxis: "TimeAxis",
                            yAxis: "ValueAxis",
                            valueMemberPath: "data",
                            isTransitionInEnabled: true,
                            isHighlightingEnabled: true
                        }]);
                    })

                    // $("#seriesType").change(function(e) {
                    //     var marker = "none";
                    //     var thickness = 5,
                    //         seriesType = $(this).val();

                    //     $('#data-chart-' + hub._id).igDataChart("option", "series", [{
                    //         type: $(this).val(),
                    //         name: "Value",
                    //         xAxis: "TimeAxis",
                    //         yAxis: "ValueAxis",
                    //         valueMemberPath: "data",
                    //         markerType: marker,
                    //         isTransitionInEnabled: true,
                    //         isHighlightingEnabled: true,
                    //         thickness: thickness
                    //     }]);
                    // })
                })
            }
        })
    }

    DataChartController.$inject = ['$scope', '$routeParams', 'HubResource']

    return DataChartController
})
