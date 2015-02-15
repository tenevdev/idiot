// Check if the authenticated user is the owner of a given client
exports.isClientOwner = function(req, res, next) {
    if (req.user._id === req.client.owner._id) {
        return next()
    }
    res.status(401).json()
    return next(new Error('Unauthorized'))
}
