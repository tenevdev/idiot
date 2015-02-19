'use strict';

/**
 * @ngdoc function
 * @name idiotApp.controller:HelpCtrl
 * @description
 * # HelpCtrl
 * Controller of the idiotApp
 */
angular.module('idiotApp')
  .controller('HelpCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
