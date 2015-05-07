define([
    'angular',
    './data-chart-controller',
    './polar-chart-controller',
    'components/project-service/project-stack/project-stack-service',
    'igniteDataVisualization'
], function(angular, DataChartController, PolarChartController) {
    var DataVisualization = angular.module('DataVisualization', ['ProjectStackService'])

    DataVisualization.controller('DataChartController', DataChartController)
    DataVisualization.controller('PolarChartController', PolarChartController)

    return DataVisualization
})
