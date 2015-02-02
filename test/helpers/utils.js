var User = require('../../server/models').Resources.User,
    Project = require('../../server/models').Resources.Project,
    Hub = require('../../server/models').Resources.Hub,
    async = require('async')

exports.getCallback = function(test, next) {
    return function callback(err, res) {
        expect(err).to.not.exist
        test.response = res
        test.result = res.body
        next()
    }
}

exports.buildUrl = function(){
	var args = Array.prototype.slice.call(arguments);
	return args.join('/')
}

exports.createUser = function(next) {
    var user = new User(userData('username-test', 'password-test'))

    user.save(function(err, createdUser) {
        if (err)
            return next(err)
        var accessToken = 'Basic ' + new Buffer(createdUser.username + ':' + createdUser.password).toString('base64')
        return next(null, user, accessToken)
    })
}

exports.createProject = function(ownerId, next) {
    var project = new Project(projectData('project-test'))
    project.owner = ownerId

    project.save(next)
}

exports.createHub = function(projectId, ownerId, next) {
    var hub = new Hub(hubData('hub-test'))
    hub.owner = ownerId

    async.waterfall([

            function(next) {
                hub.save(next)
            },
            function(createdHub, aff, next) {
                createdHub.attachToProject(projectId, next)
            }
        ],
        function(err, project, hub) {
            return next(err, hub)
        })
}

exports.createDataPoint = function(hub, next) {
    hub.addDataPoint(dataPointData(), next)
}

exports.clearAll = function(next) {
    var models = [User, Project, Hub]

    async.each(models, function(model, next) {
        model.remove(next)
    }, next)
}

exports.clear = function(modelsToClean, next) {
    var models = {
        User: User,
        Project: Project,
        Hub: Hub
    }

    if (Array.isArray(modelsToClean)) {
        async.each(modelsToClean, function(modelName, next) {
            models[modelName].remove(next)
        }, next)
    } else {
        models[modelsToClean].remove(next)
    }
}

exports.hubData = hubData

function hubData(name) {
    return {
        name: name,
        state: 'active'
    }
}

exports.userData = userData

function userData(name, password) {
    return {
        username: name,
        email: name + '@test.com',
        password: password || 'password-test',
        firstName: 'Test',
        lastName: 'User'
    }
}

exports.projectData = projectData

function projectData(name) {
    return {
        name: name
    }
}

exports.dataPointData = dataPointData

function dataPointData() {
    return {
        test: 'data-test'
    }
}