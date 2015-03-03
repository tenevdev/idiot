define(['angular',
    'angularResource',
    './project-stack/project-stack-service'
], function(angular) {

    var ProjectService = angular.module('ProjectService', ['ngResource', 'ProjectStackService']),
        ProjectResource = function($resource) {

            return $resource('/api/:user/projects/:project', {
                user: '@user',
                project: '@project'
            }, {
                'update': {
                    method: 'PUT'
                },
                'list': {
                    method: 'GET',
                    url: '/api/projects',
                    params: {
                        page: '@page',
                        perPage: '@perPage'
                    },
                    isArray: true,
                    cache: true
                }
            })
        }

    ProjectResource.$inject = ['$resource']

    ProjectService.factory('ProjectResource', ProjectResource)

    return ProjectService
})
