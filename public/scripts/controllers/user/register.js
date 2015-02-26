define(['app'], function(app) {
    var injectParams = ['$scope'],
        RegisterController = function($scope) {
            this.message = 'Hello, Register!'
        }

    RegisterController.$inject = injectParams

    app.register.controller('RegisterController', RegisterController)
})
