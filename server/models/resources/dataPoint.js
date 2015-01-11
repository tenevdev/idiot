var mongoose = require('mongoose')

var dataPointSchema = new mongoose.Schema({
    data: {},
    timeStamp: Date
})

module.exports = mongoose.model('DataPoint', dataPointSchema)