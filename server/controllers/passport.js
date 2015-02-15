var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = require('../models').Resources.User,
    Client = require('../models').OAuth.Client

passport.use(new BasicStrategy(
    function(username, password, next) {
        User.findOne({
            username: username
        }, 'hashedPassword', function(err, user) {
            if (err) {
                return next(err)
            }

            // No user found with that username
            if (!user) {
                return next(null, false)
            }

            // Make sure the password is correct
            user.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    return next(err)
                }

                // Password did not match
                if (!isMatch) {
                    return next(null, false)
                }

                // Success
                return next(null, user)
            })
        })
    }
))

passport.use('client-basic',
    new BasicStrategy({
            usernameField: 'id',
            passwordField: 'secret'
        },
        function(id, secret, next) {
            Client.findById(id, function(err, client) {
                if (err) {
                    return next(err)
                }

                // No client found with that id
                if (!client) {
                    return next(null, false)
                }

                // Make sure the secret is correct
                client.verifySecret(secret, function(err, isMatch) {
                    if (err) {
                        return next(err)
                    }

                    // Secret did not match
                    if (!isMatch) {
                        return next(null, false)
                    }

                    // Success
                    return next(null, client)
                })
            })
        }
    ))

exports.isUserAuthenticated = passport.authenticate('basic', {
    session: false
})

exports.isClientAuthenticated = passport.authenticate('client-basic', {
    session: false
})
