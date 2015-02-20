define(['app'], function(app) {
    var injectParams = ['$scope'],
        LoginController = function($scope ngMaterial) {
            this.message = 'Hello, Login!'
        }

    LoginController.$inject = injectParams

    app.register.controller('LoginController', LoginController)
})
