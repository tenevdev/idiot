define(['app'], function(app) {

    var injectParams = ['$resource'],
        ProjectResource = function($resource) {

            return $resource('/api/:user/projects/:project', {
                user: '@username',
                project: '@projectName'
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

    ProjectResource.$inject = injectParams

    app.register.factory('ProjectResource', ProjectResource)
})
