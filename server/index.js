var app = require('express')(),
    getConfigurationValue = require('./config').getValueForEnvironment

// TODO: Connect to database here

// TODO: Setup express application here
app.set('port', getConfigurationValue('/app/port', app.get('env')))

function start() {
    app.listen(app.get('port'))
}

module.exports = {
	start: start,
	app: app
}