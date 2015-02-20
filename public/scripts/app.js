define([
    'angular',
    'angularRoute',
    'angularResource',
    'angularAria',
    'angularAnimate',
    'hammer',
    'angularMaterial',
    'services/routeResolver'
], function(angular, angularRoute, angularResource, angularAria, angularAnimate, hammer, angularMaterial, routeResolver) {

    // Create main application module
    var app = angular
        .module('idiotApp', [
            'ngResource',
            'ngMaterial',
            'ngRoute',
            'routeResolverServices',
        ])

    // Configure routes
    app.config(['$routeProvider', '$controllerProvider', 'routeResolverProvider',

        function($routeProvider, $controllerProvider, routeResolverProvider) {

            app.register = {
                controller: $controllerProvider.register
            }

            var route = routeResolverProvider.route

            $routeProvider
                .when('/', route.resolve('basic/home'))
                .when('/about', route.resolve('basic/about'))
                .when('/explore', route.resolve('basic/explore'))
                .when('/projects/', route.resolve('project/list'))
                .when('/projects/:projectId', route.resolve('project/single'))
                .when('/login', route.resolve('user/login'))
                .when('/register', route.resolve('user/register'))
                .when('/profile', route.resolve('user/profile'))
                .otherwise({
                    redirectTo: '/'
                })
        }
    ])

    // app.run(['$rootScope', '$location', 'authService',
    //     function($rootScope, $location, authService) {

    //         //Client-side security
    //         $rootScope.$on("$routeChangeStart", function(event, next, current) {
    //             if (next && next.$$route && next.$$route.secure) {
    //                 if (!authService.user.isAuthenticated) {
    //                     $rootScope.$evalAsync(function() {
    //                         authService.redirectToLogin()
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // ])

    return app
})
