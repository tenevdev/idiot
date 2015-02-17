var ClientController = require('../../controllers').OAuth.ClientController,
    PassportController = require('../../controllers').PassportController,
    ClientRouter = require('express').Router({
        mergeParams: true
    })

// Tries to authenticate a user internally
// and loads req.client
ClientRouter.param('client', ClientController.load)

ClientRouter.route('/')
    .get(PassportController.isAuthenticated, ClientController.list)
    .post(PassportController.isAuthenticated, ClientController.create)

ClientRouter.route('/:client')
    .get(ClientController.isOwnerAuthorized, ClientController.single)
    .put(ClientController.isOwnerAuthorized, ClientController.update)
    .delete(ClientController.isOwnerAuthorized, ClientController.delete)

module.exports = ClientRouter
