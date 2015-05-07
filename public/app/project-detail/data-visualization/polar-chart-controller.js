define(['jquery', 'ignite'], function($) {
    var DataChartController = function($scope, $routeParams, HubResource) {
        var self = this
        self.seriesType = 'polarLine'
        self.show = false;

        $scope.$on('HubSelectionChange', function(e, hub) {
            if (self.hub) {
                self.show = true
            } else {
                self.hub = hub;
                data = hub.dataStream.dataPoints

                for (var i = data.length - 1; i >= 0; i--) {
                    data[i].timeStamp = new Date(data[i].timeStamp)
                    data[i].angle = data[i].data[0]
                    data[i].radius = data[i].data[1]
                }

                $('#data-chart-' + hub._id).igDataChart({
                    width: "400px",
                    height: "400px",
                    title: hub.name,
                    subtitle: "Vector Data Chart",
                    dataSource: data,
                    axes: [{
                        name: "AngleAxis",
                        type: "numericAngle"
                    }, {
                        name: "RadiusAxis",
                        type: "numericRadius",
                        minimumValue: 0,
                        maximumValue: 20,
                        interval: 2
                    }],
                    series: [{
                        name: "Vector",
                        type: "polarLine",
                        angleAxis: "AngleAxis",
                        radiusAxis: "RadiusAxis",
                        angleMemberPath: "angle",
                        radiusMemberPath: "radius"
                    }],
                    horizontalZoomable: true,
                    verticalZoomable: true,
                    windowResponse: "immediate"
                })

                self.show = true

                $scope.$watch(function() {
                    return self.seriesType;
                }, function(newVal, oldVal) {
                    // Remove old series
                    $('#data-chart-' + self.hub._id).igDataChart("option", "series", [{
                        name: 'Vector',
                        remove: true
                    }]);

                    // Add new series
                    $('#data-chart-' + self.hub._id).igDataChart("option", "series", [{
                        type: newVal,
                        name: "Vector",
                        angleAxis: "AngleAxis",
                        radiusAxis: "RadiusAxis",
                        angleMemberPath: "angle",
                        radiusMemberPath: "radius"
                    }]);
                })
            }
        })
    }

    DataChartController.$inject = ['$scope', '$routeParams', 'HubResource']

    return DataChartController
})
