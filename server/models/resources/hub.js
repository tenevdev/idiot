var mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.ObjectId,
    Project = require('./project'),
    DataPoint = require('./dataPoint'),
    states = ['active', 'stopped', 'suspended', 'undefined'],
    storeStrategies = ['none', 'merge', 'clear']

var hubSchema = new mongoose.Schema({
    name: String,
    owner: {
        type: ObjectId,
        ref: 'User'
    },
    state: {
        type: String,
        enum: states
    },
    dataStream: {
        dataType: String,
        dataPoints: [DataPoint.schema],
        storeStrategy: {
            type: String,
            enum: storeStrategies
        }
    },
})

hubSchema.virtual('lastDataPoint')
    .get(function() {
        return this.dataStream.dataPoints[this.dataStream.dataPoints.length - 1]
    })

hubSchema.methods = {
    addDataPoint: function(data, next) {
        // TODO: Respect the store strategy and check availability
        // Check if data is of the defined data type for this data stream
        // Check if data contains a time stamp
        var index = this.dataStream.dataPoints.push(new DataPoint({
            data: data,
            timeStamp: Date.now()
        })) - 1

        this.save(function(err, hub) {
            if (err)
                return next(err)
            return next(null, hub.dataStream.dataPoints[index])
        })
    },
    removeDataPoint: function(id, next){
        this.dataStream.dataPoints.pull(id)

        this.save(function(err, hub){
            if(err)
                return next(err)
            return next(null, hub)
        })
    },
    attachToProject: function(projectId, next) {
        var self = this

        Project.findByIdAndUpdate(projectId, {
            // Add reference to this hub
            $push: {
                hubs: self.id
            }
        }, function(err, project) {
            if (err)
                return next(err)
            return next(null, project, self)
        })
    },
    detachFromProject: function(projectId, next) {
        var self = this

        Project.findByIdAndUpdate(projectId, {
            // Add reference to this hub
            $pull: {
                hubs: self.id
            }
        }, function(err, project) {
            if (err)
                return next(err)
            return next(null, project, self)
        })
    },
    getProjects: function(next) {
        Project.find({
            hubs: {
                $elemMatch: this.id
            }
        }, null, function(err, projects) {
            if (err)
                return next(err)
            return next(null, projects)
        })
    }
}

hubSchema.statics = {
    create: function(hubData, next) {
        // Create the new hub
        var hub = new this(hubData);

        // Save
        hub.save(function(err, hub) {
            if (err)
                return next(err)

            // Make sure there is a projectId before updating
            if (hubData.projectId) {
                // Find project with projectId
                Project.findByIdAndUpdate(hubData.projectId, {
                    // Add reference to this hub
                    $push: {
                        'hubs': hub.id
                    }
                }, function(err, project) {
                    if (err)
                        return next(err)
                    return next(null, hub)
                })
            }

            // The hub was created without a link to a project
            return next(null, hub)
        })
    }
};

module.exports = mongoose.model('Hub', hubSchema)