var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var matchSchema = new mongoose.Schema({
    name: String,
    hubs: [{
        type: ObjectId,
        ref: 'Hub'
    }],
    matchType: String
})

matchSchema.methods = {

}

matchSchema.statics = {

    getById: function(matchId, options, next) {

    },

    getAll: function(options, next) {

    },

    getHubs: function(matchId, options, next) {

    }
}

module.exports = mongoose.model('Match', matchSchema)