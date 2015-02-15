var OAuthRouter = require('express').Router({
    mergeParams: true
})

OAuthRouter.use('/clients', require('./client'))

module.exports = OAuthRouter
