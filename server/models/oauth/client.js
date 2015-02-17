var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    validation = require('../helpers/validation'),
    encryption = require('bcrypt-schema').setEncryption

var clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        select: false
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

clientSchema.path('name').validate(validation.uniqueFieldInsensitive('Client', 'name'),
    'A client with this name already exists')

// Will send plainSecret value to client-side
clientSchema.set('toJSON', {
    virtuals: true
})

clientSchema.virtual('plainSecret')
    .get(function() {
        return this._plainSecret
    })
    .set(function(secret) {
        this._plainSecret = secret
    })

clientSchema.pre('save', function(next) {

    // Client secret has not changed
    if (!this.isModified('plainSecret') && !this.isNew) {
        return next()
    }

    // Client secret has changed or this is a new client
    // Accept both plainSecret and secret parameters
    // coming from request body
    // PS: secret is only accepted on POST
    var secret = this.plainSecret || this.secret
    this.setSecret(secret, next)
})

clientSchema.plugin(encryption, 'secret')

clientSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .populate('owner')
            .lean(isLean)
            .exec(next)
    },
    getPage: function(conditions, options, next) {
        this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)
            .populate('owner')
            .lean()
            .exec(next)
    },
    // Should always be called before doing findByIdAndUpdate
    // to protect from undesired modifications
    validateUpdate: function(requestBody, next) {
        if (requestBody.secret) {
            return next(new Error('Cannot modify field : secret'))
        }
        return next()
    }
}

module.exports = mongoose.model('Client', clientSchema)
