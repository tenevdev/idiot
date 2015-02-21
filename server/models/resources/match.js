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

module.exports = mongoose.model('Match', matchSchema)
