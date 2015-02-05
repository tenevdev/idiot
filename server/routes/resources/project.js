var ProjectController = require('../../controllers').Resources.ProjectController,
    ProjectStack = require('./projectStack'),
    ProjectRouter = require('express').Router({
        mergeParams: true
    })

ProjectRouter.param('project', ProjectController.load)

ProjectRouter.route('/')
    .get(ProjectController.listByOwner)
    .post(ProjectController.create)

ProjectRouter.route('/:project')
    .get(ProjectController.single)
    .put(ProjectController.update)
    .delete(ProjectController.delete)
    .patch(ProjectController.patch)

//Project stack
ProjectRouter.route('/:project/hubs', ProjectStack.HubRouter)
ProjectRouter.route('/:project/bundles', ProjectStack.BundleRouter)
ProjectRouter.route('/:project/matches', ProjectStack.MatchRouter)

module.exports = ProjectRouter
