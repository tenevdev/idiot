var HubController = require('../../../controllers').Resources.HubController,
    HubRouter = require('express').Router({
        mergeParams: true
    })

HubRouter.param('hub', HubController.load)

HubRouter.route('/')
    .get(HubController.list)
    .post(HubController.create)

HubRouter.route('/:hub')
    .get(HubController.single)
    .put(HubController.update)
    .delete(HubController.delete)

HubRouter.route('/:hub/datapoints')
    .get(HubController.listDataPoints)
    .post(HubController.createDataPoint)

module.exports = HubRouter