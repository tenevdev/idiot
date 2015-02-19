'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('ProjectCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
