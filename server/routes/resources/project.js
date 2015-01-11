// Handle requests on route /projects
var ProjectController = require('../../controllers').Resources.ProjectController,
    ProjectRouter = require('express').Router({
        mergeParams: true
    })

ProjectRouter.route('/')
    .get(ProjectController.list)
    .post(ProjectController.create)

ProjectRouter.route('/:owner')
    .get(ProjectController.listByOwner)
    .post(ProjectController.create)

ProjectRouter.route('/:owner/:project')
    .get(ProjectController.single)
    .put(ProjectController.update)
    .delete(ProjectController.delete)
    .patch(ProjectController.patch)

module.exports = ProjectRouter