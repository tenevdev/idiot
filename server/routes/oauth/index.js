var OAuthRouter = require('express').Router({
        mergeParams: true
    }),
    OAuth2Controller = require('../../controllers').OAuth.OAuth2Controller,
    PassportController = require('../../controllers').PassportController

OAuthRouter.use('/clients', require('./client'))

OAuthRouter.route('/authorize')
    .get(PassportController.isAuthenticated, OAuth2Controller.authorization)
    .post(PassportController.isAuthenticated, OAuth2Controller.decision)

OAuth2Controller.route('/token')
    .post(PassportController.isClientAuthenticated, OAuth2Controller.token)

module.exports = OAuthRouter
