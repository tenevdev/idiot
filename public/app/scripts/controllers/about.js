'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
