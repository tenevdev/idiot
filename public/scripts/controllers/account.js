'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('AccountCtrl', function ($scope, $http) {
	var config = {
        params: {
            'rows': 10,
            'name': '{lorem}',
            'id': '{index}',
            'callback': "JSON_CALLBACK"
        }
    }
    $http.jsonp("http://www.filltext.com", config, {}).success(function (data) {
        $scope.users = data
    });


  });