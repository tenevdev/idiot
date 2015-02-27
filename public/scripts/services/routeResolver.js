define(['angular'], function() {
    var routeResolverService = function() {

        this.$get = function() {
            return this
        }
        // Enable configuration of directiories
        this.routeConfig = function() {
            var viewsDirectory = '/views/',
                controllersDirectory = 'assets/scripts/controllers/',

                setBaseDirectories = function(viewsDir, controllersDir) {
                    viewsDirectory = viewsDir
                    controllersDirectory = controllersDir
                },

                getViewsDirectory = function() {
                    return viewsDirectory
                },

                getControllersDirectory = function() {
                    return controllersDirectory
                }

            return {
                setBaseDirectories: setBaseDirectories,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            }
        }()

        this.route = function(routeConfig) {

            // Create a route definition object
            // with a templateUrl and a controller
            var resolve = function(path, controllerAs) {
                    var routeDef = {}
                    var segments = path.split('/')

                    routeDef.templateUrl = routeConfig.getViewsDirectory() + path
                    //routeDef.controller = segments[segments.length - 1]

                    // Controller alias
                    if (controllerAs) {
                        routeDef.controllerAs = controllerAs
                    } else {
                        routeDef.controllerAs = segments[segments.length - 1]
                    }

                    routeDef.resolve = {
                        load: ['$q', '$rootScope',
                            function($q, $rootScope) {
                                // Inject controller as a dependency
                                var dependencies = [routeConfig.getControllersDirectory() + path + '.js']
                                return resolveDependencies($q, $rootScope, dependencies)
                            }
                        ]
                    }

                    return routeDef
                },

                // Require controllers
                resolveDependencies = function($q, $rootScope, dependencies) {
                    var defer = $q.defer()
                    require(dependencies, function() {
                        defer.resolve()
                        $rootScope.$apply()
                    })

                    return defer.promise
                }

            return {
                resolve: resolve
            }
        }(this.routeConfig)
    }

    var servicesApp = angular.module('routeResolverServices', [])

    //Must be a provider since it will be injected into module.config()
    servicesApp.provider('routeResolver', routeResolverService)
})
