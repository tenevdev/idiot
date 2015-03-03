define([
    'angular',
    './data-chart-controller',
    'components/project-service/project-stack/project-stack-service',
    'ignite',
    'angularIgnite'
], function(angular, DataChartController) {
    var DataVisualization = angular.module('DataVisualization', ['ProjectStackService'])

    DataVisualization.controller('DataChartController', DataChartController)

    return DataVisualization
})
