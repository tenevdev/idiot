var Project = require('../../models').Resources.Project,
    jsonPatch = require('fast-json-patch'),
    HttpError = require('../../utils/errors/httpError')

module.exports = {
    list: function(req, res, next) {
        Project.getPage(req.query, function(err, projects) {
            if (err) {
                return next(err)
            }
            res.status(200).json(projects)
            return next()
        })
    },
    listByOwner: function(req, res, next) {
        Project.getPage(req.query, function(err, projects) {
            if (err) {
                return next(err)
            }
            res.status(200).json(projects)
            return next()
        })
    },
    create: function(req, res, next) {
        var project = new Project(req.body)
        project.owner = req.user.id

        project.save(function(err, project) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.status = 400
                }
                return next(err)
            }
            res.status(201).json(project)
            return next()
        })
    },
    load: function(req, res, next, projectName) {
        // Lean query is used when the request is read-only
        var lean = req.method === 'GET'
        Project.getByName(projectName, lean, function(err, project) {
            if (err) {
                return next(err)
            }
            if (project) {
                req.project = project
                return next()
            }
            err = new HttpError(404, 'A project with this name does not exist : ' + projectName)
            return next(err)
        })
    },
    single: function(req, res, next) {
        res.status(200).json(req.project)
        return next()
    },
    update: function(req, res, next) {
        Project.findByIdAndUpdate(req.project.id, req.body, function(err, project) {
            if (err) {
                return next(err)
            }
            res.status(200).json(project)
            return next()
        })
    },
    delete: function(req, res, next) {
        req.project.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    },
    patch: function(req, res, next) {
        if (jsonPatch.apply(req.project, req.body)) {
            // The patch was applied successfully
            req.project.save(function(err, project) {
                if (err) {
                    return next(err)
                }
                res.status(204)
                return next()
            })
        }
        return next(new HttpError(400, 'Could not apply json patch'))
    }
}
