define(['app'], function(app) {
    var injectParams = ['$scope'],
        AboutController = function($scope) {
            this.message = 'Hello, About!'
        }

    AboutController.$inject = injectParams

    app.register.controller('AboutController', AboutController)
})
