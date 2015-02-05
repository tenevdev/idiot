var app = require('express')(),
    env = app.get('env'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    logger = require('morgan'),
    passport = require('passport'),
    getConfigurationValue = require('./config').getValueForEnvironment

// TODO: Connect to database here
mongoose.connect(getConfigurationValue('/database', env))

// TODO: Setup express application here
app.set('port', getConfigurationValue('/app/port', env))

app.use(bodyParser.json())

require('./controllers/passport')
app.use(passport.initialize())

if (env === 'development') {
    app.use(logger('dev'))
}
app.use(require('./routes'))

// Error middleware
app.use(function(err, req, res, next){
	// Handles not found errors from all routes
	// Maybe this should be used only on API calls and views should serve a 404 page
	if(err.status !== 404)
		return next()
	res.status(404).json(err)
	
})

app.use(function(err, req, res, next){
	// TODO: log error and request and submit a bug
	res.status(500).json(err)
})

function start() {
    app.listen(app.get('port'))
}

module.exports = {
    start: start,
    app: app
}