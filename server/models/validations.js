var mongoose = require('mongoose')

// Validate fields that need to be unique and are case-insensitive
// Also validate empty fields
exports.uniqueFieldInsensitive = function(modelName, field) {
    return function(val, cb) {
        if (val && val.length) { // if string not empty/null

            // Setup a query that lookups the collection
            var query = mongoose.models[modelName]
                .where(field, new RegExp('^' + val + '$', 'i'))

            if (!this.isNew) {
                // Exclude this if it exists
                query = query.where('_id').ne(this._id)
            }

            query.count(function(err, n) {
                // Actual validation comparing the number of documents
                cb(n < 1)
            })
        } else {
            // The field is empty, thus not valid
            cb(false)
        }
    }
}
