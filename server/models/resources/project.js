var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    validation = require('../helpers/validation')

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

projectSchema.path('name').validate(validation.uniqueFieldInsensitive('Project', 'name'),
    'A project with this name already exists')

projectSchema.methods = {}

function formatRequestQueryForListing(req, params) {
    var query = req.query,
        conditions = {},
        options = {
            page: query.page || 1,
            perPage: query.perPage || 30,
            tags: query.tags || []
        }

    delete query.page
    delete query.perPage
    delete query.tags

    if (req.user) {
        conditions.owner = req.user._id
    }

    for (var prop in query) {
        if (query.hasOwnProperty(prop))
            conditions[prop] = query[prop]
    }

    return {
        conditions: conditions,
        options: options
    }
}

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

    getPage: function(req, next) {
        // Format query
        var formatted = formatRequestQueryForListing(req),
            options = formatted.options,
            conditions = formatted.conditions,
            // Conditions and pagination
            query = this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)
            // Filter by tags
        if (options.tags.length > 0) {
            query = query.where('tags').in(options.tags)
        }
        //.where('tags').in(options.tags)
        // Populate references
        query.populate('owner')
            .populate('hubs')
            .populate('bundles')
            .populate('matches')
            .populate('collaborators')
        // Read-only
        .lean()
            .exec(next)
    }
}

module.exports = mongoose.model('Project', projectSchema)
