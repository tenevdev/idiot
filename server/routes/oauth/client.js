var ClientController = require('../../controllers').OAuth.ClientController,
    PassportController = require('../../controllers').PassportController,
    AuthorizationController = require('../../controllers').AuthorizationController,
    ClientRouter = require('express').Router({
        mergeParams: true
    })

// Tries to authenticate a user internally
// and loads req.client
ClientRouter.param('client', ClientController.load)

ClientRouter.route('/')
    .get(PassportController.isUserAuthenticated, ClientController.list)
    .post(PassportController.isUserAuthenticated, ClientController.create)

ClientRouter.route('/:client')
    .get(AuthorizationController.isClientOwner, ClientController.single)
    .put(AuthorizationController.isClientOwner, ClientController.update)
    .delete(AuthorizationController.isClientOwner, ClientController.delete)

module.exports = ClientRouter
