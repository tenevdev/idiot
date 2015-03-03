define(function() {
    var RegisterController = function($http, $location, AuthenticationService, $mdDialog) {
        this.submit = function() {
            var self = this

            $http.post('/api/users', {
                username: this.username,
                password: this.password,
                email: this.email
            }).success(function(userProfile, status) {
                // Redirect new user to home page
                AuthenticationService.setCredentials(self.username, self.password)
                $location.path('/')
            }).error(function(response, status) {
                // Display error
                var alert = $mdDialog.alert({
                    title: 'Something went wrong!',
                    content: 'An error has occured while creating your account. ' + response.message,
                    ok: 'Try again'
                })

                $mdDialog.show(alert)
            })
        }
    }

    RegisterController.$inject = ['$http', '$location', 'UserAuthenticationService', '$mdDialog']

    return RegisterController
})
