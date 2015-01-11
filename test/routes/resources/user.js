var request = require('supertest'),
    sinon = require('sinon'),
    UserController = require('../../../server/controllers').Resources.UserController,
    User = require('../../../server/models').Resources.User

describe('Routes', function() {
    before(function() {
        request = request(require('../../../server').app)
    })
    describe('User', function() {
        describe('GET /users', function() {
            var getPageStub,
                listSpy
            before(function(done) {
                getPageStub = sinon.stub(User, 'getPage')
                listSpy = sinon.spy(UserController, 'list')
                done()
            })

            after(function(done) {
                User.getPage.restore()
                UserController.list.restore()
                done()
            })

            it('should call UserController list method to handle this request', function(done) {
                getPageStub.yields(null, [])
                request.get('/api/users')
                    .end(function(res) {
                        expect(getPageStub.calledOnce).true
                        done()
                    })
            })
        })
    })
})