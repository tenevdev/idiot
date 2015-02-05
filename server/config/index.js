var Confidence = require('confidence'),
    root = require('path').normalize(__dirname + '/../..'),
    store = new Confidence.Store({
        app: {
            name: 'idiot',
            port: {
                $filter: 'env',
                production: process.env.PORT,
                test: process.env.PORT,
                $default: 3000
            }
        },
        rootPath: root,
        database: {
            $filter: 'env',
            production: process.env.MONGOLAB_URI,
            staging: 'mongodb://localhost/idiot_staging',
            development: 'mongodb://localhost/idiot_development',
            test: 'mongodb://localhost/idiot_test',
            $default: 'mongodb://localhost/idiot_development'
        }
    })

module.exports = {
    getValueForEnvironment: function(key, env) {
        return store.get(key, {
            env: env
        })
    }
}
