var ResourceRouter = require('express').Router({
        mergeParams: true
    }),
    ProjectController = require('../../controllers').Resources.ProjectController,
    UserController = require('../../controllers').Resources.UserController

ResourceRouter.param('owner', UserController.load)
ResourceRouter.param('project', ProjectController.load)

ResourceRouter.use('/projects/:owner/:project/hubs', require('./hub'))
ResourceRouter.use('/projects/:owner/:project/bundles', require('./bundle'))
ResourceRouter.use('/projects/:owner/:project/matches', require('./match'))

ResourceRouter.use('/hubs', require('./hub'))

ResourceRouter.use('/projects', require('./project'))

ResourceRouter.use('/users', require('./user'))

module.exports = ResourceRouter