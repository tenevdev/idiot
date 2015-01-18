var Project = require('../../models').Resources.Project,
    jsonPatch = require('fast-json-patch')

module.exports = {
    list: function(req, res, next) {
        var options = {
                page: req.query.page || 1,
                perPage: req.query.perPage || 30
            },
            conditions = {}
        Project.getPage(conditions, options, function(err, projects) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(200).json(projects)
            return next()
        })
    },
    listByOwner: function(req, res, next) {
        var options = {
                user: {
                    id: req.query.user
                },
                page: req.query.page || 1,
                perPage: req.query.perPage || 30
            },
            conditions = {}
        Project.getPage(conditions, options, function(err, projects) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(200).json(projects)
            return next()
        })
    },
    create: function(req, res, next) {
        var project = new Project(req.body)

        project.save(function(err, project) {
            if (err) {
                if (err.name === 'ValidationError') {
                    res.status(400)
                } else {
                    res.status(500)
                }
                res.json(err)
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
                res.status(500).json(err)
                return next(err)
            }
            if (project) {
                req.project = project
                return next()
            }
            res.status(404).json('Project not found')
            return next(new Error('Project not found'))
        })
    },
    single: function(req, res, next) {
        res.status(200).json(req.project)
        return next()
    },
    update: function(req, res, next) {
        Project.findByIdAndUpdate(req.project.id, req.body, function(err, project) {
            if (err) {
                res.status(500).json(err)
                return next(err)
            }
            res.status(200).json(project)
            return next()
        })
    },
    delete: function(req, res, next) {
        req.project.remove(function(err) {
            if (err) {
                res.status(500).json(err)
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
                    res.status(500).json(err)
                    return next(err)
                }
                res.status(204)
                return next()
            })
        }
        res.status(400)
        return next(new Error('Bad request'))
    }
}