var ViewsRouter = require('express').Router({
    mergeParams: true
})

ViewsRouter.get('/partials/:partialName', function(req, res, next){
	res.render('../../public/views/' + req.params.partialName + '.html')
})

module.exports = ViewsRouter
