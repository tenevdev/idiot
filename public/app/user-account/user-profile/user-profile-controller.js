define(function() {
    var UserProfileController = function($location, $rootScope, UserAuthenticationService) {
        this.logout = function() {
            UserAuthenticationService.clearCredentials()
            $location.path('/')
        }

        this.projects = function(){
        	$location.path('/projects/' + $rootScope.globals.currentUser.username)
        }
        
    }

    UserProfileController.$inject = ['$location', '$rootScope', 'UserAuthenticationService']

    return UserProfileController
})
