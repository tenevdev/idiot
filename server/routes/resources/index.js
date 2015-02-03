var ResourceRouter = require('express').Router({
        mergeParams: true
    }),
    ProjectController = require('../../controllers').Resources.ProjectController,
    UserController = require('../../controllers').Resources.UserController

// Load owner and project from parameters
// owner is a unique username
ResourceRouter.param('owner', UserController.load)
// project is a unique project name
ResourceRouter.param('project', ProjectController.load)

// These routes are shortcuts without /users prefix
// and without /projects segment where it makes sense
ResourceRouter.use('/:owner/:project/hubs', require('./hub'))
ResourceRouter.use('/:owner/:project/bundles', require('./bundle'))
ResourceRouter.use('/:owner/:project/matches', require('./match'))
ResourceRouter.use('/:owner/projects', require('./project'))

// This route is a pagination option for projects
// When finished should support complete filtering and be used as a feed
ResourceRouter.get('/projects', ProjectController.list)

// This route is a full expanded version of the shortcuts
// which is right according to REST API best practices
// Plus it supports operations on users
ResourceRouter.use('/users', require('./user'))

module.exports = ResourceRouter