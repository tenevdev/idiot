// Handle requests on route /projects
var ProjectController = require('../../controllers').Resources.ProjectController,
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
ProjectRouter.route('/:project/hubs', require('./hub'))
ProjectRouter.route('/:project/bundles', require('./bundle'))
ProjectRouter.route('/:project/matches', require('./match'))

module.exports = ProjectRouter