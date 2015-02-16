var oauth2orize = require('oauth2orize'),
    server = oauth2orize.createServer(),
    User = require('../../models').Resources.User,
    Client = require('../../models').OAuth.Client,
    AccessToken = require('../../models').OAuth.AccessToken,
    AuthorizationCode = require('../../models').OAuth.AuthorizationCode,
    uid = require('../utils').uid

// Store the transaction in a session
server.serializeClient(function(client, next) {
    return next(null, client._id)
})

server.deserializeClient(function(id, next) {
    Client.findById(id, function(err, client) {
        if (err)
            return next(err)
        return next(null, client)
    })
})

// Create an authorization code
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares, next) {
    var authCode = new AuthorizationCode({
        value: uid(16),
        clientId: client._id,
        redirectUri: redirectUri,
        userId: user._id
    })

    authCode.save(function(err) {
        if (err)
            return next(err)
        return next(null, authCode.value)
    })
}))

// Exchange an authorization code for an access token
server.exchange(oauth2orize.exchange.code(function(client, codeValue, redirectUri, next) {
    AuthorizationCode.findOne({
        value: codeValue
    }, function(err, authCode) {
        if (err)
            return next(err)
        if (authCode === undefined)
            return next(null, false)
        if (client._id !== authCode.clientId || redirectUri !== authCode.redirectUri)
            return next(null, false)

        authCode.remove(function(err) {
            if (err)
                return next(err)

            var token = new AccessToken({
                value: uid(256),
                clientId: authCode.clientId,
                userId: authCode.userId
            })

            token.save(function(err) {
                if (err)
                    return next(err)
                return next(null, token)
            })
        })
    })
}))

// Initiate authorization process
exports.authorization = [
    server.authorization(function(clientId, redirectUri, next) {
        Client.findById(clientId, function(err, client) {
            if (err)
                return next(err)
            return next(null, client, redirectUri)
        })
    }),
    function(req, res) {
        // Render dialog
    }
]

// Initiate grant process
exports.decision = [
    server.decision()
]

// Initiates exchange process
exports.token = [
    server.token(),
    server.errorHandler()
]
