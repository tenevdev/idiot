function errorResponse(err, req, res, next) {
    if (err.status) {
        res.status(err.status).json(err)
    } else {
        res.status(500).json(err)
    }
    return next(err)
}

function errorLog(err, req, res, next) {
    // TODO: Add advanced logging
    console.log(err)
    return next(err)
}

module.exports = {
    response: errorResponse,
    log: errorLog,
    all: [errorLog, errorResponse]
}
