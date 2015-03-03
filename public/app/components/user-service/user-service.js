define(['angular', 'angularResource'], function(angular) {
    var UserService = angular.module('UserService', ['ngResource']),
        UserResource = function($resource) {
            return $resource('/api/users/:user', {
                user: '@username'
            }, {
                'update': {
                    method: 'PUT'
                }
            })
        }

    UserResource.$inject = ['$resource']

    UserService.factory('UserResource', UserResource)

    return UserService
})
