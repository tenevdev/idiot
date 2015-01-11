var app = require('express')(),
    logger = require('morgan'),
    getConfigurationValue = require('./config').getValueForEnvironment

// TODO: Connect to database here

// TODO: Setup express application here
app.set('port', getConfigurationValue('/app/port', app.get('env')))

if (app.get('env') === 'development') {
    app.use(logger('dev'))
}
app.use(require('./routes'))

function start() {
    app.listen(app.get('port'))
}

module.exports = {
    start: start,
    app: app
}