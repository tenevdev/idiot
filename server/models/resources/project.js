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

function formatRequestQueryForListing(query) {
    var conditions, options
    options = {
        page: query.page || 1,
        perPage: query.perPage || 30,
        tags: query.tags || []
    }

    delete query.page
    delete query.perPage
    delete query.tags

    conditions = query

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

    getPage: function(query, next) {

        // Remove tags from conditions
        var formatted = formatRequestQueryForListing(query),
            options = formatted.options,
            conditions = formatted.conditions,

            // Condiotions and pagination
            query = this.find(conditions)
            .skip((options.page - 1) * options.perPage)
            .limit(options.perPage)

        // Contained tags
        // Should be passed in the query string as
        // tags[]=sometag&tags[]=anothertag&...
        if (options.tags)
            query = query.where('tags').elemMatch(function(tag) {
                tag.or(options.tags)
            })

        // Populate references and continue
        query.populate('owner')
            .populate('hubs')
            .populate('bundles')
            .populate('matches')
            .populate('collaborators')
            .lean()
            .exec(next)
    }
}

module.exports = mongoose.model('Project', projectSchema)
