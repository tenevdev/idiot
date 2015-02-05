var UserController = require('../../controllers').Resources.UserController,
    UserRouter = require('express').Router({
        mergeParams: true
    })

UserRouter.param('user', UserController.load)

UserRouter.route('/')
    .get(UserController.list)
    .post(UserController.create)

UserRouter.route('/:user')
    .get(UserController.single)
    .put(UserController.update)
    .delete(UserController.delete)

UserRouter.route('/:user/projects', require('./project'))

module.exports = UserRouter
