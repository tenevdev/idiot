var User = require('../../models').Resources.User,
    passport = require('passport'),
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    list: function(req, res, next) {
        User.getPage(req.query, function(err, users) {
            if (err) {
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
                    err.status = 400
                }
                return next(err)
            }
            User.findById(user.id, function(err, user) {
                if (err) {
                    return next(err)
                }
                res.location(user.id)
                res.status(201).json(user)
                return next()
            })
        })
    },
    load: function(req, res, next, username) {
        var isLogin = false
        if (req.route) {
            isLogin = req.route.path === '/:user' && req.method === 'POST'
        }

        if (req.method === 'GET' || isLogin) {
            User.getByName(username, true, function(err, user) {
                if (err) {
                    return next(err)
                }
                if (user) {
                    req.user = user
                    return next()
                }
                err = new HttpError(404, 'A user with this username does not exist : ' + username)
                return next(err)
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
                return next(err)
            }
            User.findByIdAndUpdate(req.user.id, req.body, {new: true}, function(err, user) {
                if (err) {
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
                return next(err)
            }
            res.status(204).json('User deleted')
            return next()
        })
    },
    login: function(req, res, next) {
        passport.authenticate('basic', function(err, user, info) {
            if (err) {
                return next(err)
            }

            if (!user || req.user._id.toString() !== user._id.toString()) {
                // Wrong username or password
                return next(new HttpError(400, 'Wrong username or password'))
            }

            res.status(200).json(req.user)
            return next()

        })(req, res, next)
    }
}
