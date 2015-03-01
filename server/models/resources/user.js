var mongoose = require('mongoose'),
    validation = require('../helpers/validation'),
    encryption = require('bcrypt-schema').setEncryption,
    HttpError = require('../../utils/errors/httpError')

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    },
    hashedPassword: {
        type: String,
        select: false
    },
    firstName: String,
    lastName: String,
    passwordResetToken: String,
    passwordResetExpires: Date
})

userSchema.path('username').validate(validation.uniqueFieldInsensitive('User', 'username'),
    'A user with the same username already exists')

userSchema.path('email').validate(validation.uniqueFieldInsensitive('User', 'email'),
    'A user with the same email already exists')

userSchema.virtual('fullName')
    .get(function() {
        return this.firstName + ' ' + this.lastName
    })

userSchema.virtual('password')
    .get(function() {
        return this._password
    })
    .set(function(password) {
        this._password = password
    })

userSchema.pre('save', function(next) {

    // Password has not changed
    if (!this.isModified('password') && !this.isNew) {
        return next()
    }

    //Password has changed or this is a new user
    this.setPassword(this.password, next)
})

userSchema.plugin(encryption, {
    field: 'hashedPassword',
    verify: 'verifyPassword',
    set: 'setPassword'
})

function formatRequestQueryForListing(query) {
    var conditions = {},
        options = {
            page: query.page || 1,
            perPage: query.perPage || 30
        }

    delete query.page
    delete query.perPage

    for (var prop in query) {
        if (query.hasOwnProperty(prop))
            conditions[prop] = query[prop]
    }

    return {
        conditions: conditions,
        options: options
    }
}

userSchema.statics = {

    getByName: function(name, isLean, next) {
        this.findOne({
            username: name
        })
            .lean(isLean)
            .exec(next)
    },
    getPage: function(query, next) {
        var formatted = formatRequestQueryForListing(query),
            options = formatted.options,
            conditions = formatted.conditions

        this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)
            .lean()
            .exec(next)
    },
    validateUpdate: function(requestBody, next) {
        if (requestBody.hasOwnProperty('hashedPassword')) {
            return next(new HttpError(400, 'Cannot modify field : hashedPassword'))
        }
        return next()
    }
}

module.exports = mongoose.model('User', userSchema)
