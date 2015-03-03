define(function() {
    var UserProfileController = function() {
        this.logout = function($location, UserAuthenticationService) {
            UserAuthenticationService.clearCredentials()
            $location.path('/')
        };

        
    }

    UserProfileController.$inject = ['$location', 'UserAuthenticationService']

    return UserProfileController
})
