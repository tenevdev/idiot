define(function() {
    var UniqueUsernameDirective = function($http) {

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

                $http.get('/api/users/' + value)
                    .success(function(data) {
                        // This user exists
                        ctrl.$setValidity('unique', false)
                        ctrl.$error.unique = true
                        scope.busy = false
                    })
                    .error(function(data) {
                        // This user does not exist
                        scope.busy = false
                    })
            })
        }

        return {
            require: 'ngModel',
            link: link,
        }
    }

    UniqueUsernameDirective.$inject = ['$http']

    return UniqueUsernameDirective
})
