define(['app'], function(app) {
    var injectParams = ['$http'],
        uniqueEmailDirective = function($http) {

            var link = function(scope, element, attrs, ctrl) {
                scope.busy = false
                scope.$watch(attrs.ngModel, function(value) {

                    // Reset errors
                    ctrl.$setValidity('unique', true)

                    if (!value) {
                        // No need to check
                        return
                    }

                    scope.busy = true

                    $http.get('/api/users?email=' + value)
                        .success(function(data) {
                            if (data.length > 0) {
                                // A user with this email exists
                                ctrl.$setValidity('unique', false)
                                ctrl.$error.unique = true
                            }
                            scope.busy = false
                        })
                        .error(function(data) {
                            // Server error
                            scope.busy = false
                        })
                })
            }

            return {
                require: 'ngModel',
                link: link,
            }
        }

    uniqueEmailDirective.$inject = injectParams

    app.register.directive('uniqueEmail', uniqueEmailDirective)
})
