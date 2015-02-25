define(['app'], function(app) {
    var injectParams = ['$resource'],
        HubResource = function($resource) {
            return $resource('/api/:user/:project/hubs/:hubId', {
                user: '@username',
                project: '@projectName',
                hubId: '@hubId'
            }, {
                'update': {
                    method: 'PUT'
                },
                'createDataPoint': {
                    method: 'POST',
                    url: '/api/:user/:project/hubs/:hubId/datapoints'
                },
                'listDataPoints': {
                    method: 'GET',
                    url: '/api/:user/:project/hubs/:hubId/datapoints',
                    isArray: true
                }
            })
        }
})
