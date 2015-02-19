var Match = require('../../models').Resources.Match

module.exports = {
    list: function(req, res, next) {
        if (req.project.matches) {
            res.status(200).json(req.project.matches)
            return next()
        }
        return next(new Error())
    },
    create: function(req, res, next) {
        var match = new Bundle(req.body)

        match.save(function(err, match) {
            if (err) {
                if (err.name === 'ValidationError') {
                    err.status = 400
                }
                return next(err)
            }
            res.status(201).json(match)
            return next()
        })
    },
    load: function(req, res, next, matchId) {
        Match.findById(matchId)
            .populate('hubs')
            .exec(function(err, match) {
                if (err) {
                    return next(err)
                }
                if (match) {
                    req.match = match
                    return next()
                }
                err = new HttpError(404, 'A match with this id does not exist : ' + matchId)
                return next(err)
            })
    },
    single: function(req, res, next) {
        res.status(200).json(req.match)
    },
    update: function(req, res, next) {
        Match.findByIdAndUpdate(req.match.id, req.body, function(err, match) {
            if (err) {
                return next(err)
            }
            res.status(200).json(match)
            return next()
        })
    },
    delete: function(req, res, next) {
        req.match.remove(function(err) {
            if (err) {
                return next(err)
            }
            res.status(204).json()
            return next()
        })
    }
}
