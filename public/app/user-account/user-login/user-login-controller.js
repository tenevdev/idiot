define(function() {
    var LoginController = function($location, $mdDialog, AuthenticationService) {

        // reset login status
        AuthenticationService.clearCredentials()

        this.login = function() {
            this.dataLoading = true

            var self = this

            AuthenticationService.login(this.username, this.password)
                .success(function(userProfile, status) {
                    AuthenticationService.setCredentials(self.username, self.password)
                    $location.path('/')
                })
                .error(function(error, status) {
                    self.dataLoading = false

                    var alert = $mdDialog.alert({
                        title: 'We couldn\'t sign you in!',
                        content: error.message,
                        ok: 'Try again'
                    })

                    $mdDialog.show(alert)
                })
        }
    }

    LoginController.$inject = ['$location', '$mdDialog', 'UserAuthenticationService']

    return LoginController
})
