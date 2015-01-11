// Handle requests on route /projects/{owner}/{project}/matches
var MatchController = require('../../controllers').Resources.MatchController,
    MatchRouter = require('express').Router({
        mergeParams: true
    })

MatchRouter.route('/')
    .get(MatchController.list)
    .post(MatchController.create)

MatchRouter.route('/:match')
    .get(MatchController.single)
    .put(MatchController.update)
    .delete(MatchController.delete)

module.exports = MatchRouter