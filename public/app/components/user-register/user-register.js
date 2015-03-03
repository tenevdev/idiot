define(['angular',
    './match-password-directive',
    './unique-username-directive',
    './unique-email-directive'
], function(angular, MatchPassword, UniqueUsername, UniqueEmail) {
    var UserRegister = angular.module('UserRegisterDirectives', [])

    UserRegister.directive('matchPassword', MatchPassword)
    UserRegister.directive('uniqueUsername', UniqueUsername)
    UserRegister.directive('uniqueEmail', UniqueEmail)

    return UserRegister
})
