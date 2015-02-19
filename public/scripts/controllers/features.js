'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:FeaturesCtrl
 * @description
 * # FeaturesCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('FeaturesCtrl', function ($scope, $http) {
var config = {
        params: {
            'rows': 5,
            'name': '{lorem|2}',
            'info': '{lorem|20}',
            'callback': "JSON_CALLBACK"
        }
    }
    $http.jsonp("http://www.filltext.com", config, {}).success(function (data) {
        $scope.features = data
    });


  });