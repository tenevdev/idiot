var Client = require('../../models').OAuth.Client,
    passport = require('passport')

module.exports = {
    list: function(req, res, next) {
        var options = {
                page: req.query.page || 1,
                perPage: req.query.perPage || 30
            },
            conditions = {
                owner: req.user._id
            }
        Client.getPage(conditions, options, function(err, clients) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(200).json(clients)
            return next()
        })
    },
    create: function(req, res, next) {
        var client = new Client(req.body)

        client.owner = req.user.id

        client.save(function(err, client) {
            if (err) {
                if (err.name === 'ValidationError') {
                    res.status(400)
                } else {
                    res.status(500)
                }
                res.json(err)
                return next(err)
            }
            Client.findById(client.id, function(err, client) {
                if (err) {
                    res.status(500).json(err)
                    return next(err)
                }
                res.location(client.id)
                res.status(201).json(client)
                return next()
            })
        })
    },
    load: function(req, res, next, clientName) {
        var isLean = req.method === 'GET'

        // Load requested client
        Client.getByName(clientName, isLean, function(err, client) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            if (client) {
                req.client = client
                // Authenticate a user who will be
                // later checked against the client owner
                passport.authenticate('basic', {
                    session: false
                })(req, res, next)
            } else {
                res.status(404).json('Client not found')
                return next(new Error('Client not found'))
            }
        })
    },
    single: function(req, res, next) {
        res.status(200).json(req.client)
        return next()
    },
    update: function(req, res, next) {
        // Check for unwanted updates
        // such as updating the hashed field
        Client.validateUpdate(req.body, function(err) {
            if (err) {
                res.status(400).json(err)
                return next(err)
            }
            Client.findByIdAndUpdate(req.client.id, req.body, function(err, client) {
                if (err) {
                    res.status(500).json(err)
                    return next(err)
                }
                res.status(200).json(client)
                return next()
            })
        })
    },
    delete: function(req, res, next) {
        req.client.remove(function(err) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(204).json('Client deleted')
            return next()
        })
    },
    isOwnerAuthorized: function(req, res, next) {
        if (req.user._id.toString() == req.client.owner._id.toString()) {
            return next()
        }
        res.status(401).json()
        return next(new Error('Unauthorized'))
    }
}
