var Bundle = require('../../models').Resources.Bundle,
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    list: function(req, res, next) {
        if (req.project.bundles) {
            res.status(200).json(req.project.bundles)
            return next()
        }
        return next(new Error())
    },
    create: function(req, res, next) {
        var bundle = new Bundle(req.body)

        bundle.save(function(err, bundle) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.status = 400
                }
                return next(err)
            }
            res.status(201).json(bundle)
            return next()
        })
    },
    load: function(req, res, next, bundleId) {
        Bundle.findById(bundleId)
            .populate('hubs')
            .exec(function(err, bundle) {
                if (err) {
                    return next(err)
                }
                if (bundle) {
                    req.bundle = bundle
                    return next()
                }
                err = new HttpError(404, 'A bundle with this id does not exist : ' + bundleId)
                return next(err)
            })
    },
    single: function(req, res, next) {
        res.status(200).json(req.bundle)
    },
    update: function(req, res, next) {
        Bundle.findByIdAndUpdate(req.bundle.id, req.body, function(err, bundle) {
            if (err) {
                return next(err)
            }
            res.status(200).json(bundle)
            return next()
        })
    },
    delete: function(req, res, next) {
        req.bundle.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
