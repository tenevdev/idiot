define(['app', '$resource'], function(app, $resource) {
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
})
