var mongoose = require('mongoose'),
    encryption = require('bcrypt-schema').setEncryption


var accessTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
})

accessTokenSchema.virtual('plainToken')
    .get(function() {
        return this._plainToken
    })
    .set(function(token) {
        this._plainToken = token
    })

accessTokenSchema.pre('save', function(next) {

    // Access token has not changed
    if (!this.isModified('plainToken') && !this.isNew) {
        return next()
    }

    // Access token has changed or this is a new access token
    this.setCode(this.plainToken, next)
})

accessTokenSchema.plugin(encryption, 'token')

module.exports = mongoose.model('AccessToken', accessTokenSchema)
