define([
    'angular',
    'angularIgnite'
], function(angular) {

    // Create main application module
    var app = angular
        .module('visualApp', ['igniteui-directives'])

    // Configure routes
    app.config([
        '$compileProvider',
        '$controllerProvider',
        '$provide',
        function($compileProvider, $controllerProvider, $provide) {

            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                factory: $provide.factory
            }
        }
    ])

    return app
})
