var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    validations = require('../validations')

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
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/
    },
    hashedPassword: {
        type: String,
        required: 'Password is a required field',
        select: false
    },
    firstName: String,
    lastName: String,
    passwordResetToken: String,
    passwordResetExpires: Date
})

userSchema.path('username').validate(validations.uniqueFieldInsensitive('User', 'username'),
    'A user with the same username already exists')

userSchema.path('email').validate(validations.uniqueFieldInsensitive('User', 'email'),
    'A user with the same email already exists')

userSchema.virtual('fullName')
    .get(function() {
        return this.firstName + ' ' + this.lastName
    })

userSchema.virtual('password')
    .get(function() {
        return this._password
    })

userSchema.pre('save', function(next) {

    // Password has not changed
    if (!this.isModified('password')) {
        return next()
    }

    //Password has changed
    this.setPassword(this.password, next)
})

userSchema.methods = {
    verifyPassword: function(password, next) {
        bcrypt.compare(password, this.hashedPassword, function(err, res) {
            if (err)
                return next(err)
            return next(null, res)
        })
    },
    setPassword: function(password, next) {
        var self = this
        self._password = password

        bcrypt.genSalt(10, function(err, salt) {
            if (err)
                return next(err)
            bcrypt.hash(self._password, salt, function(err, hashedPassword) {
                if (err)
                    return next(err)
                        // Set new hash
                self.hashedPassword = hashedPassword
                return next()
            })
        })
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

    getPage: function(conditions, options, next) {
        this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)
            .lean()
            .exec(next)
    }
}

module.exports = mongoose.model('User', userSchema)