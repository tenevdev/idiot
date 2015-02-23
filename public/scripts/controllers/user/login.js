define(['app'], function(app) {
  var injectParams = ['$scope', '$rootScope', '$location', 'authenticationService'],
  
    LoginController = function($scope, $rootScope, $location, AuthenticationService) {

      // reset login status
      AuthenticationService.ClearCredentials();

      this.login = function() {
        this.dataLoading = true;
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
          if (response.success) {
            AuthenticationService.SetCredentials($scope.username, $scope.password);
            $location.path('/');
            console.log('Hello ' + $scope.username);
          } else {
            this.error = response.message;
            this.dataLoading = false;
            console.log('try again');
          }
        });
      };
    }

  LoginController.$inject = injectParams

  app.controller('LoginController', LoginController)
})