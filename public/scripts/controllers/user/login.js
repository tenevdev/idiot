define(['app', 'services/authService'], function(app) {
    var injectParams = ['$location', 'AuthenticationService'],

        LoginController = function($location, AuthenticationService) {

            // reset login status
            AuthenticationService.clearCredentials();

            this.login = function() {
                this.dataLoading = true;

                var self = this

                AuthenticationService.login(this.username, this.password)
                    .success(function(userProfile, status) {
                        AuthenticationService.setCredentials(self.username, self.password);
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
