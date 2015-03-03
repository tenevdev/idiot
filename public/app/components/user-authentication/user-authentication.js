define(['angular',
    './base64-service',
    './user-authentication-service'
], function(angular, Base64Service, UserAuthenticationService) {
    var UserAuthentication = angular.module('UserAuthentication', [])

    UserAuthentication.factory('Base64Service', Base64Service)
    UserAuthentication.factory('UserAuthenticationService', UserAuthenticationService)

    return UserAuthentication
})
