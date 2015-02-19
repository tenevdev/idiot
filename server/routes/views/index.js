var ViewsRouter = require('express').Router({
    mergeParams: true
})

ViewsRouter.get('/views/:area/:view', function(req, res, next){
	res.render(req.params.area + '/' + req.params.view)
})

ViewsRouter.get('/', function(req, res){
    res.render('index')
})

module.exports = ViewsRouter
