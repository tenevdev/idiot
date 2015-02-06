var mongoose = require('mongoose'),
    validation = require('../helpers/validation'),
    encryption = require('../helpers/encryption')

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
    this.setPassword(this.password, 'hashedPassword', next)
})

userSchema.methods = {
    verifyPassword: encryption.verifyValue,
    setPassword: encryption.setValue
}

userSchema.statics = {

    getByName: function(name, isLean, next) {
        this.findOne({
            username: name
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

module.exports = mongoose.model('User', userSchema)
