var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId

var bundleSchema = new mongoose.Schema({
    name: String,
    hubs: [{
        type: ObjectId,
        ref: 'Hub'
    }]
})

module.exports = mongoose.model('Bundle', bundleSchema)