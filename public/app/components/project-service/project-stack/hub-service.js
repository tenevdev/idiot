define([], function() {

    var HubResource = function($resource) {
        return $resource('/api/:user/:project/hubs/:hubId', {
            user: '@use',
            project: '@project',
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

    HubResource.$inject = ['$resource']
    return HubResource
})
