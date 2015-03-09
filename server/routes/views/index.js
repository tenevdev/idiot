var ViewsRouter = require('express').Router({
    mergeParams: true
})

ViewsRouter.get('/views/:view', function(req, res, next) {
    res.render('components/views/' + req.params.view)
    return next()
})

ViewsRouter.get('/partials/*', function(req, res, next) {
    res.render(req.path.slice('/partials/'.length))
    return next()
})

ViewsRouter.get('/*', function(req, res, next) {
    // Render Angular app
    if (!res.headersSent) {
        res.render('index')
    }
    return next()
})

module.exports = ViewsRouter
