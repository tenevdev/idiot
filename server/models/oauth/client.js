var mongoose = require('mongoose')

var clientSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
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
    this.setCode(this.plainSecret, next)
})

clientSchema.plugin(encryption, 'secret')

clientSchema.statics = {
    getByName: function(name, isLean, next) {
        this.findOne({
            name: name
        })
            .lean(isLean)
            .exec(next)
    },
    getPage: function(conditions, options, next) {
        this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)
            .lean()
            .exec(next)
    }
}

module.exports = mongoose.model('Client', clientSchema)
