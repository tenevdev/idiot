var request = require('supertest'),
    testUtils = require('../helpers/utils'),
    async = require('async'),
    testCase = {}

describe('user.js', function() {
    var user, baseRoute
    before(function(done) {
        request = request(require('../../server').app)
        baseRoute = testUtils.buildRoute('api', 'users')

        done()
    })
    beforeEach('create a user', function(done) {
        testUtils.createUser(function(err, createdUser, accessToken) {
            expect(err).to.not.exist()

            user = createdUser
            user.accessToken = accessToken

            done()
        })
    })
    afterEach('remove all users', function(done) {
        testUtils.clear('User', done)
    })
    after('remove all users', function(done) {
        testUtils.clear('User', done)
    })
    describe('when not authorized', function() {
        describe('when updating a user', function() {
            beforeEach('send update request', function(done) {
                request.put(testUtils.attachToRoute(baseRoute, user.username))
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
        describe('when deleting a user', function() {
            beforeEach('send delete request', function(done) {
                request.delete(testUtils.attachToRoute(baseRoute, user.username))
                    .expect(401)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should not be authorized', function() {
                expect(testCase.response.unauthorized)
            })
        })
    })
    describe('when public', function() {
        describe('when listing users', function() {
            beforeEach('send read request', function(done) {
                request.get(baseRoute)
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should return an array', function() {
                expect(testCase.result).to.be.an('array')
            })
        })
        describe('when getting a single user', function() {
            beforeEach('send read request', function(done) {
                request.get(testUtils.attachToRoute(baseRoute, user.username))
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should have a name', function() {
                expect(testCase.result).to.have.property('username')
            })
            it('should not have password', function() {
                expect(testCase.result).to.not.have.property('password')
                expect(testCase.result).to.not.have.property('hashedPassword')
            })
        })
        describe('when creating a new user', function() {
            beforeEach('send create request', function(done) {
                request.post(baseRoute)
                    .send(testUtils.userData('user-creation'))
                    .expect(201)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should create a new user', function() {
                expect(testCase.result.username).to.be.ok()
                expect(testCase.result._id).to.be.ok()
            })
            describe('and a duplicate name exists', function() {
                beforeEach('send create request with the same name', function(done) {
                    request.post(baseRoute)
                        .send(testUtils.hubData('user-creation'))
                        .expect(400)
                        .end(testUtils.getCallback(testCase, done))
                })
                it('should be a bad request', function() {
                    expect(testCase.response.badRequest)
                })
            })
        })
    })
    describe('when authorized', function() {
        describe('when updating an existing user', function() {
            beforeEach('send update request', function(done) {
                request.put(testUtils.attachToRoute(baseRoute, user.username))
                    .set('Authorization', user.accessToken)
                    .send({
                        username: 'updated-test-user'
                    })
                    .expect(200)
                    .end(testUtils.getCallback(testCase, done))

            })
            it('should update the user', function() {
                expect(testCase.result.username).to.equal('updated-test-user')
            })
        })
        describe('when deleting an exisiting user', function() {
            beforeEach('send delete request', function(done) {
                request.delete(testUtils.attachToRoute(baseRoute, user.username))
                    .set('Authorization', user.accessToken)
                    .expect(204)
                    .end(testUtils.getCallback(testCase, done))
            })
            it('should delete the user', function(done) {
                request.get(testUtils.attachToRoute(baseRoute, user.username))
                    .expect(404, done)
            })
        })
    })
})