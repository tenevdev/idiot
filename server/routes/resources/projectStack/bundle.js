var BundleController = require('../../../controllers').Resources.BundleController,
    BundleRouter = require('express').Router({
        mergeParams: true
    })

BundleRouter.route('/')
    .get(BundleController.list)
    .post(BundleController.create)

BundleRouter.route('/:bundle')
    .get(BundleController.single)
    .put(BundleController.update)
    .delete(BundleController.delete)

module.exports = BundleRouter