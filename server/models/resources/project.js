var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    validations = require('../validations')

var projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: [String],
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    collaborators: [{
        type: ObjectId,
        ref: 'User'
    }],
    hubs: [{
        type: ObjectId,
        ref: 'Hub'
    }],
    bundles: [{
        type: ObjectId,
        ref: 'Bundle'
    }],
    matches: [{
        type: ObjectId,
        ref: 'Match'
    }]
})

projectSchema.path('name').validate(validations.uniqueFieldInsensitive('Project', 'name'),
    'A project with this name already exists')

projectSchema.methods = {}

projectSchema.statics = {

    getByName: function(projectName, isLean, next) {
        this.findOne({
            name: projectName
        })
            .populate('owner')
            .populate('hubs')
            .populate('bundles')
            .populate('matches')
            .populate('collaborators')
            .lean(isLean)
            .exec(next)
    },

    getPage: function(conditions, options, next) {
        this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)
            .populate('owner')
            .populate('hubs')
            .populate('bundles')
            .populate('matches')
            .populate('collaborators')
            .lean()
            .exec(next)
    }
}

module.exports = mongoose.model('Project', projectSchema)