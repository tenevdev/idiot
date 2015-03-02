define([
    'angular',
    'angularRoute',
    'angularResource',
    'angularAria',
    'angularAnimate',
    'hammer',
    'angularMaterial',
    'services/routeResolver',
    'angularCookies',
    'angularMessages',
    'angularIgnite'
], function(angular) {

    // Create main application module
    var app = angular
        .module('idiotApp', [
            'ngResource',
            'ngMaterial',
            'ngRoute',
            'routeResolverServices',
            'ngCookies',
            'ngMessages',
            'igniteui-directives'
        ])

    // Configure routes
    app.config(['$routeProvider',
        '$locationProvider',
        '$compileProvider',
        '$controllerProvider',
        '$provide',
        'routeResolverProvider',
        function($routeProvider, $locationProvider, $compileProvider, $controllerProvider, $provide, routeResolverProvider) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                factory: $provide.factory
            }

            // Enable HTML5 routing
            $locationProvider.html5Mode(true)

            // Setup routes
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
                .when('/sample', route.resolve('visual/sample'))
                .otherwise({
                    redirectTo: '/'
                })
        }
    ])

    return app
})
