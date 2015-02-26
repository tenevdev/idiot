define([
    'angular',
    'angularRoute',
    'angularResource',
    'angularAria',
    'angularAnimate',
    'hammer',
    'angularMaterial',
    'services/routeResolver',
    'angularCookies'
], function(angular, angularRoute, angularResource, angularAria, angularAnimate, hammer, angularMaterial, routeResolver, angularCookies) {

    // Create main application module
    var app = angular
        .module('idiotApp', [
            'ngResource',
            'ngMaterial',
            'ngRoute',
            'routeResolverServices',
            'ngCookies'
        ])

    // Configure routes
    app.config(['$routeProvider', '$controllerProvider', '$provide','routeResolverProvider',

        function($routeProvider, $controllerProvider, $provide, routeResolverProvider) {

            app.register = {
                controller: $controllerProvider.register,
                factory: $provide.factory
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

    return app
})
