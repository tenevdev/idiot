var OAuthRouter = require('express').Router({
    mergeParams: true
})

OAuthRouter.route('/clients', require('./client'))

module.exports = OAuthRouter
