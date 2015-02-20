define(['app'], function(app) {
    var injectParams = ['$scope'],
        AboutController = function($scope, ngMaterial) {
            this.message = 'Hello, About!'
        }

    AboutController.$inject = injectParams

    app.register.controller('AboutController', AboutController)
})
