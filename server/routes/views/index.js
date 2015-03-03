var ViewsRouter = require('express').Router({
    mergeParams: true
})

ViewsRouter.get('/views/:view', function(req, res, next) {
    res.render('components/views/' + req.params.view)
})

ViewsRouter.get('/partials/*', function(req, res, next){
    res.render(req.path.slice('/partials/'.length))
})

ViewsRouter.get('/*', function(req, res) {
    // Render Angular app
    res.render('index')
})

module.exports = ViewsRouter
