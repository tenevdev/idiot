define(['app'], function(app) {
  var injectParams = ['$scope', '$rootScope', '$location', 'AuthenticationService'],
  
    LoginController = function($scope, $rootScope, $location, AuthenticationService) {

      // reset login status
      AuthenticationService.ClearCredentials();

      $scope.login = function() {
        $scope.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
          if (response.success) {
            AuthenticationService.SetCredentials($scope.username, $scope.password);
            $location.path('/');
          } else {
            $scope.error = response.message;
            $scope.dataLoading = false;
          }
        });
      };
    }

  LoginController.$inject = injectParams

  app.register.controller('LoginController', LoginController)
})