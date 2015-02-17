function HttpError(status, message) {
    Error.call(this)
    Error.captureStackTrace(this, arguments.callee)

    this.status = status
    this.message = message
}

HttpError.prototype.__proto__ = Error.prototype

module.exports = HttpError
