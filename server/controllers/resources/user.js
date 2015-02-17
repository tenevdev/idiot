var User = require('../../models').Resources.User,
    passport = require('passport')

module.exports = {
    list: function(req, res, next) {
        var options = {
                page: req.query.page || 1,
                perPage: req.query.perPage || 30
            },
            conditions = {}
        User.getPage(conditions, options, function(err, users) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(200).json(users)
            return next()
        })
    },
    create: function(req, res, next) {
        var user = new User(req.body)

        user.save(function(err, user) {
            if (err) {
                if (err.name === 'ValidationError') {
                    res.status(400)
                } else {
                    res.status(500)
                }
                res.json(err)
                return next(err)
            }
            User.findById(user.id, function(err, user) {
                if (err) {
                    res.status(500).json(err)
                    return next(err)
                }
                res.location(user.id)
                res.status(201).json(user)
                return next()
            })
        })
    },
    load: function(req, res, next, username) {
        if (req.method === 'GET') {
            User.getByName(username, true, function(err, user) {
                if (err) {
                    res.status(500).json(err)
                    return next(err)
                }
                if (user) {
                    req.user = user
                    return next()
                }
                res.status(404).json('User not found')
                return next(new Error('User not found'))
            })
        } else {
            passport.authenticate('basic', {
                session: false
            })(req, res, next)
        }
    },
    single: function(req, res, next) {
        res.status(200).json(req.user)
        return next()
    },
    update: function(req, res, next) {
        User.validateUpdate(req.body, function(err) {
            if (err) {
                res.status(err.status).json(err)
                return next(err)
            }
            User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
                if (err) {
                    res.status(500).json(err)
                    return next(err)
                }
                res.status(200).json(user)
                return next()
            })
        })
    },
    delete: function(req, res, next) {
        req.user.remove(function(err) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(204).json('User deleted')
            return next()
        })
    }
}
