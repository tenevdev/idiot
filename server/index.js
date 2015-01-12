var app = require('express')(),
    env = app.get('env'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    getConfigurationValue = require('./config').getValueForEnvironment

// TODO: Connect to database here
mongoose.connect(getConfigurationValue('/database', env))

// TODO: Setup express application here
app.set('port', getConfigurationValue('/app/port', env))

app.use(bodyParser.json())

if (env === 'development') {
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