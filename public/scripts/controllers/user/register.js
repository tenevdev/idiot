define(['app'], function(app) {
    var injectParams = ['$http', '$location'],
        RegisterController = function($http, $location) {
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
                    var errors = response.errors,
                    message = response.message
                    self.error = message
                })
            }
        }

    RegisterController.$inject = injectParams

    app.register.controller('RegisterController', RegisterController)
})
