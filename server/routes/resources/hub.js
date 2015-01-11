// Handle requests on route /projects/{owner}/{project}/hubs
var HubController = require('../../controllers').Resources.HubController,
    ProjectController = require('../../controllers').Resources.ProjectController,
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

module.exports = HubRouter