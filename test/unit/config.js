var config = require('../../server/config')

describe('configuration', function() {
    describe('#getValueForEnvironment()', function() {
        it('should return a port number for non-production environment', function() {
            var port = config.getValueForEnvironment('/app/port')
            expect(port).to.be.a('number')
        })
    })
})