var ResourceRouter = require('express').Router({
    mergeParams: true
})

ResourceRouter.param('owner', function(req, res, next, ownerId) {
    // Fetch owner from DB
    // Inject into req object for later use
})

ResourceRouter.param('project', function(req, res, next, projectId) {
    // Fetch project from DB
    // Inject into req object for later use
})

ResourceRouter.use('/projects/:owner/:project/hubs', require('./hub'))
ResourceRouter.use('/projects/:owner/:project/bundles', require('./bundle'))
ResourceRouter.use('/projects/:owner/:project/matches', require('./match'))

ResourceRouter.use('/hubs', require('./hub'))

ResourceRouter.use('/projects', require('./project'))

ResourceRouter.use('/users', require('./user'))

module.exports = ResourceRouter