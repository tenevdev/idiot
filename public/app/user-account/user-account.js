define(['angular',
    './user-login/user-login-controller',
    './user-register/user-register-controller',
    'angularRoute',
    'angularMessages',
    'components/user-authentication/user-authentication',
    'components/user-register/user-register'
], function(angular, LoginController, RegisterController) {
    var UserAccount = angular.module('UserAccount', ['ngMessages', 'UserAuthentication', 'UserRegisterDirectives'])

    UserAccount.controller('LoginController', LoginController)
    UserAccount.controller('RegisterController', RegisterController)

    UserAccount.config([
        '$routeProvider',
        '$locationProvider',
        function($routeProvider, $locationProvider) {

            $routeProvider
                .when('/login', {
                    controller: 'LoginController',
                    templateUrl: '/partials/user-account/user-login/user-login'
                })
                .when('/register', {
                    controller: 'RegisterController',
                    templateUrl: '/partials/user-account/user-register/user-register'
                })
        }
    ])

    return UserAccount
})