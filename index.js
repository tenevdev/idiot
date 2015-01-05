var app = require('express')(),
    getConfigurationValue = require('./server/config').getValueForEnvironment

app.listen(getConfigurationValue('/app/port', app.get('env')))
