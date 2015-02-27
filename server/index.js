var express = require('express'),
    app = express(),
    env = app.get('env'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    passport = require('passport'),
    getConfigurationValue = require('./config').getValueForEnvironment,
    errorHandler = require('./utils/errors/errorHandler')

// Connect to database
mongoose.connection.on('error', function() {
    console.error('Error connecting to database: %s\nShutting down...',
        getConfigurationValue('/database', env))
    process.exit()
})
mongoose.connect(getConfigurationValue('/database', env))

// Setup express application
app.set('port', getConfigurationValue('/app/port', env))

// View engine
app.set('view engine', 'jade');
app.set('views', getConfigurationValue('/rootPath', env) + '/server/views');

app.use(bodyParser.json())

require('./controllers/passport')
app.use(passport.initialize())

if (env === 'development') {
    app.use(logger('dev'))
}

// Static files
app.use('/assets', express.static('./public'))

app.use(require('./routes'))

// Error middleware
app.use(errorHandler.all)

function start() {
    app.listen(app.get('port'))
}

module.exports = {
    start: start,
    app: app
}
