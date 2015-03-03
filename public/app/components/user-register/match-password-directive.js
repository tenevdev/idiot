define(function() {
    var MatchPasswordDirective = function() {
        var link = function(scope, element, attrs, ctrl) {
            scope.$watch('[' + attrs.ngModel + ', register.' + attrs.matchPassword + ']', function(value) {
                // Compare the value of the model with the match
                ctrl.$setValidity('match', value[0] === value[1])
            }, true)
        }

        return {
            require: 'ngModel',
            link: link
        }
    }

    return MatchPasswordDirective
})
