define(['app'], function(app) {
    var injectParams = ['$scope'],
        HomeController = function($scope) {
            this.message = 'Hello, idiot!'
        }

    HomeController.$inject = injectParams

    app.register.controller('HomeController', HomeController)
})
