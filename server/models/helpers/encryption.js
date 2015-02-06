var bcrypt = require('bcrypt')

exports.verifyValue = function(value, hash, next) {
    bcrypt.compare(value, hash, function(err, res) {
        if (err)
            return next(err)
        return next(null, res)
    })
}
exports.setValue = function(value, hashField, next) {
    var self = this

    bcrypt.genSalt(10, function(err, salt) {
        if (err)
            return next(err)
        bcrypt.hash(value, salt, function(err, hash) {
            if (err)
                return next(err)

            // Set new hash
            self[hashField] = hash
            return next()
        })
    })
}
