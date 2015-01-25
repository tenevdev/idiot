var Hub = require('../../models').Resources.Hub,
    async = require('async')

module.exports = {
    list: function(req, res, next) {
        var options = {
                page: req.query.page || 1,
                perPage: req.query.perPage || 30
            },
            conditions = {}

        Hub.list(conditions, options, function(err, hubs) {
            if (err) {
                return next(err)
            }
            res.status(200).json(hubs)
            return next()
        })
    },
    listDataPoints: function(req, res, next) {
        res.status(200).json(req.hub.dataStream.dataPoints)
        next()
    },
    create: function(req, res, next) {

        var hub = new Hub(req.body)
        hub.owner = req.user.id

        async.waterfall([

            function(callback) {
                hub.save(callback)
            },
            function(hub, numberAffected, callback) {
                if (req.project) {
                    hub.attachToProject(req.project.id, callback)
                } else {
                    callback(null, null, hub)
                }
            },
            function(project, hub, callback) {
                res.status(201).json(hub)
                callback(null)
            }
        ], next);
    },
    createDataPoint: function(req, res, next) {
        req.hub.addDataPoint(req.body, function(err, dataPoint) {
            if (err)
                return next(err)
            res.status(201).json(dataPoint)
            return next()
        })
    },
    load: function(req, res, next, hubId) {
        //var lean = req.method === 'GET'
        Hub.findById(hubId, function(err, hub) {
            if (err) {
                return next(err)
            }
            if (hub) {
                req.hub = hub
                return next()
            }
            // If we got here this means a hub with this id does not exist
            var err = new Error('Hub not found')
            err.status = 404
            return next(err)
        })
    },
    single: function(req, res, next) {
        res.status(200).json(req.hub)
        return next()
    },
    update: function(req, res, next) {
        Hub.findByIdAndUpdate(req.hub.id, req.body, function(err, hub) {
            if (err) {
                return next(err)
            }
            res.status(200).json(hub)
            return next()
        })
    },
    delete: function(req, res, next) {
        req.hub.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}