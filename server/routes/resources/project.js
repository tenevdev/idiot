// Handle requests on route /projects
var ProjectController = require('../../controllers').Resources.ProjectController,
    UserController = require('../../controllers').Resources.UserController,
    ProjectRouter = require('express').Router({
        mergeParams: true
    })

ProjectRouter.param('project', ProjectController.load)
ProjectRouter.param('owner', UserController.load)

ProjectRouter.route('/')
    .get(ProjectController.list)

ProjectRouter.route('/:owner')
    .get(ProjectController.listByOwner)
    .post(ProjectController.create)

ProjectRouter.route('/:owner/:project')
    .get(ProjectController.single)
    .put(ProjectController.update)
    .delete(ProjectController.delete)
    .patch(ProjectController.patch)

module.exports = ProjectRouter