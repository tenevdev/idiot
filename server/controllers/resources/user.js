var User = require('../../models').Resources.User

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
                res.status(500).json(err)
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
        var lean = req.method === 'GET'
        User.getByName(username, lean, function(err, user) {
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
    },
    single: function(req, res, next) {
        res.status(200).json(req.user)
        return next()
    },
    update: function(req, res, next) {
        User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(200).json(user)
            return next()
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