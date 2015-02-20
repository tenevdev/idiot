define(['app'], function(app) {
    var injectParams = ['$scope'],
        ExploreController = function($scope, ngMaterial) {
            this.message = 'Hello, explore!'
        }

    ExploreController.$inject = injectParams

    app.register.controller('ExploreController', ExploreController)
})
