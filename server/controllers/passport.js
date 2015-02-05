var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = require('../models').Resources.User

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

exports.isUserAuthenticated = passport.authenticate('basic', {
    session: false
})
