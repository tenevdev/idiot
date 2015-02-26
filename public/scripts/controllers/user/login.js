define(['app', 'services/authService'], function(app) {
    var injectParams = ['$scope', '$rootScope', '$location', 'AuthenticationService'],

        LoginController = function($scope, $rootScope, $location, AuthenticationService) {

            // reset login status
            AuthenticationService.clearCredentials();

            this.login = function() {
                this.dataLoading = true;

                var self = this

                AuthenticationService.login($scope.username, $scope.password)
                    .success(function(userProfile, status) {
                        AuthenticationService.setCredentials($scope.username, $scope.password);
                        $location.path('/');
                    })
                    .error(function(error, status) {
                        self.error = error.message;
                        self.dataLoading = false;
                    });
            };
        }

    LoginController.$inject = injectParams

    app.register.controller('LoginController', LoginController)
})
