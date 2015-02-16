var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy,
    User = require('../models').Resources.User,
    Client = require('../models').OAuth.Client,
    AccessToken = require('../models').OAuth.AccessToken

// Basic authentication for users
// Requests should include Auhtorization: Basic <encoded username:password> header
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

// Basic authentication for client applications
// Requests should include Authorization: Basic <encoded clientId:clientSecret> header
passport.use('client-basic',
    new BasicStrategy({
            realm: 'Clients'
        },
        function(clientId, secret, next) {
            Client.findById(clientId, function(err, client) {
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

// Alternative authentication for client applications
// Client credentials are included in the request body
// client_id - Client identifier
// client_secret - Client secret
passport.use(new ClientPasswordStrategy(
    function(clientId, secret, next) {
        Client.findById(clientId, function(err, client) {
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
    }))

// Bearer authentication for client applications
// requesting access to user resources
// using an access token
// Requests should include Authorization: Bearer <access token> header
passport.use(new BearerStrategy(
    function(token, next) {
        AccessToken.findOne({
            token: token
        }, function(err, accessToken) {
            if (err)
                return next(err)
            if (!accessToken)
                return next(null, false)
            return next(null, accessToken, {
                scope: 'all'
            })
        })
    }))

// Authenticate access to user resources
// Basic user authentication or
// Bearer authentication of a client using an access token
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], {
    session: false
})

// Authenticate a client
exports.isClientAuthenticated = passport.authenticate(['client-basic', 'oauth2-client-password'], {
    session: false
})
