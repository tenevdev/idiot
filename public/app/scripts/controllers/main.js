'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('MainCtrl', function ($scope, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  });
