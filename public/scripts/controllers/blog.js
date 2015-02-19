'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('BlogCtrl', function ($scope, $http) {
    var config = {
        params: {
            'rows': 5,
            'text': '{lorem|40}',
            'date': '{date}',
            'callback': "JSON_CALLBACK"
        }
    }
    $http.jsonp("http://www.filltext.com", config, {}).success(function (data) {
        $scope.posts = data
    });


  });