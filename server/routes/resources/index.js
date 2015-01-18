var ResourceRouter = require('express').Router({
    mergeParams: true
})

ResourceRouter.use('/projects/:owner/:project/hubs', require('./hub'))
ResourceRouter.use('/projects/:owner/:project/bundles', require('./bundle'))
ResourceRouter.use('/projects/:owner/:project/matches', require('./match'))

ResourceRouter.use('/hubs', require('./hub'))

ResourceRouter.use('/projects', require('./project'))

ResourceRouter.use('/users', require('./user'))

module.exports = ResourceRouter