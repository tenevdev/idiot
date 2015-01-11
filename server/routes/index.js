var Router = require('express').Router({
    mergeParams: true
})

Router.use('/api/oauth2', require('./oauth'))
Router.use('/api', require('./resources'))
Router.use('/', require('./views'))

module.exports = Router