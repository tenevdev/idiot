var mongoose = require('mongoose'),
    encryption = require('bcrypt-schema').setEncryption

var authCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        select: false
    },
    redirectUri: {
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

authCodeSchema.virtual('plainCode')
    .get(function() {
        return this._plainCode
    })
    .set(function(code) {
        this._plainCode = code
    })

authCodeSchema.pre('save', function(next) {

    // Authorization code has not changed
    if (!this.isModified('plainCode') && !this.isNew) {
        return next()
    }

    // Authorization code has changed or this is a new authorization code
    this.setCode(this.plainCode, next)
})

authCodeSchema.plugin(encryption, 'code')

module.exports = mongoose.model('AuthorizationCode', authCodeSchema)
