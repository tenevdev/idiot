define(['app'], function(app) {
    var injectParams = ['$resource'],
        UserResource = function($resource) {
            return $resource('/api/users/:user', {
                user: '@username'
            }, {
                'update': {
                    method: 'PUT'
                }
            })
        }

    UserResource.$inject = injectParams

    app.register.factory('UserResource', UserResource)
})
